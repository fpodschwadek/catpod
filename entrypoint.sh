#!/bin/ash

DOCKER_SOCK="/var/run/docker.sock"

# Socket relay for Docker sockets that 'catpod' can't use through a group
# (see below). Its directory stays owned by root, so 'catpod' can't replace
# the socket.
RELAY_DIR="/run/catpod"
RELAY_SOCK="$RELAY_DIR/docker.sock"

# The container starts as root only to grant the 'catpod' user access to the
# mounted Docker socket. The socket's group ID differs between hosts, so we
# read it at runtime instead of requiring users to pass --group-add (which
# needs host-specific commands, e.g. GNU vs. BSD stat). Afterwards, the script
# re-executes itself as 'catpod'. The only thing that keeps running as root is
# the socket relay, if one is needed.
if [ "$(id -u)" = "0" ]; then
    if [ -S "$DOCKER_SOCK" ]; then
        SOCK_GID=$(stat -c '%g' "$DOCKER_SOCK")

        # Never add 'catpod' to the root group. If the socket belongs to GID 0
        # (e.g. with Docker Desktop on macOS), the socket relay below takes
        # over instead.
        if [ "$SOCK_GID" != "0" ]; then
            # Reuse an existing group with this GID, e.g. Alpine's 'ping'
            # (999) for Debian/Ubuntu hosts. Its name doesn't matter: access
            # is checked by GID only, so a new group with the same GID would
            # grant exactly the same. The only file in the image owned by a
            # group other than root or catpod is /etc/shadow (GID 42), which
            # holds no password hashes; test.sh checks that this stays so.
            SOCK_GROUP=$(awk -F: -v gid="$SOCK_GID" '$3 == gid { print $1; exit }' /etc/group)

            if [ -z "$SOCK_GROUP" ]; then
                SOCK_GROUP="docker-host"
                addgroup -g "$SOCK_GID" "$SOCK_GROUP"
            fi

            # Skip if already a member, e.g. when a stopped container is restarted.
            if ! id -Gn catpod | tr ' ' '\n' | grep -qx "$SOCK_GROUP"; then
                addgroup catpod "$SOCK_GROUP"
            fi
        fi
    fi

    # Some Docker setups mount a socket that only root can use, typically
    # root:root with mode 0755 (Docker Desktop on macOS). No group membership
    # helps there. Instead of running Ansible as root, joining the root group
    # or changing the socket's permissions (which would change them for the
    # whole host), we start a relay: socat, running as root, listens on a
    # socket owned by 'catpod' and passes every connection on to the real
    # socket byte by byte, without interpreting it. DOCKER_HOST points the
    # Docker CLI, Compose and the community.docker modules and inventory to
    # the relay. This gives 'catpod' no more than it would get through the
    # socket's group: whoever can use the Docker socket is root on the host
    # anyway.
    #
    # Only for playbook mode ('galaxy' and 'vault' don't use Docker), and only
    # if the user hasn't pointed DOCKER_HOST elsewhere (e.g. a remote daemon).
    case "$1" in
        galaxy|vault)
            ;;
        *)
            if [ -S "$DOCKER_SOCK" ] \
                && { [ -z "$DOCKER_HOST" ] || [ "$DOCKER_HOST" = "unix://$DOCKER_SOCK" ]; } \
                && ! su-exec catpod test -r "$DOCKER_SOCK" -a -w "$DOCKER_SOCK"; then

                # Check that root can connect at all: with --cap-drop ALL, root
                # loses CAP_DAC_OVERRIDE and can't use a socket owned by another
                # user either. (BusyBox's 'test -w' always succeeds for root,
                # so try a real connection; it sends no data.)
                if ! socat -u /dev/null UNIX-CONNECT:"$DOCKER_SOCK" 2>/dev/null; then
                    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >&2
                    echo "ERROR: Cannot access Docker socket" >&2
                    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >&2
                    echo "" >&2
                    echo "The Docker socket is mounted, but neither the 'catpod' user nor" >&2
                    echo "root inside the container can connect to it. This can happen with" >&2
                    echo "--cap-drop ALL if the socket belongs to a user other than root." >&2
                    echo "" >&2
                    echo "For more details, see: https://fpodschwadek.github.io/catpod/how-to-use.html" >&2
                    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >&2
                    exit 1
                fi

                mkdir -p "$RELAY_DIR"

                # Notes on the socat options:
                # - umask instead of socat's 'mode=' option: socat applies
                #   'mode=' after handing the socket to 'catpod' ('user=',
                #   'group='), and changing the mode of another user's file
                #   needs CAP_FOWNER, which the documented hardening options
                #   drop. With umask 177, the socket is created as 0600.
                # - '-t 86400': when one side stops sending (e.g. stdin of
                #   'docker run -i' or 'docker exec -i' ends), socat closes the
                #   whole connection after this many seconds. The default of
                #   0.5 s would cut off the command's remaining output.
                # - 'unlink-early' removes a socket left over from an earlier
                #   start of the same container (docker start).
                # - stdin from /dev/null, so socat doesn't hold on to the
                #   stdin that e.g. '--vault-password-file /dev/stdin' reads.
                #
                # socat runs in the background until the container ends. It's
                # in tini's process group, so 'docker stop' terminates it along
                # with Ansible. 'catpod' can't signal it (different user).
                (umask 177; exec socat -t 86400 \
                    UNIX-LISTEN:"$RELAY_SOCK",fork,unlink-early,user=catpod,group=catpod \
                    UNIX-CONNECT:"$DOCKER_SOCK") < /dev/null &
                RELAY_PID=$!

                # Wait until 'catpod' can use the relay socket. Checking only
                # that it exists isn't enough: socat creates it first and hands
                # it over to 'catpod' right after.
                TRIES=0
                while ! su-exec catpod test -r "$RELAY_SOCK" -a -w "$RELAY_SOCK"; do
                    TRIES=$((TRIES + 1))
                    if [ "$TRIES" -gt 50 ] || ! kill -0 "$RELAY_PID" 2>/dev/null; then
                        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >&2
                        echo "ERROR: Cannot start Docker socket relay" >&2
                        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >&2
                        echo "" >&2
                        echo "The Docker socket can only be used by root, so CATPOD tried to" >&2
                        echo "relay it to the 'catpod' user via $RELAY_SOCK, but failed." >&2
                        echo "Any messages from socat above show the cause." >&2
                        echo "" >&2
                        echo "For more details, see: https://fpodschwadek.github.io/catpod/how-to-use.html" >&2
                        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >&2
                        exit 1
                    fi
                    sleep 0.1
                done

                # Exported variables survive su-exec below.
                export DOCKER_HOST="unix://$RELAY_SOCK"
            fi
            ;;
    esac

    # Hand stdin/stdout/stderr over to 'catpod', as the container runtime would
    # for a non-root image user. Without this, 'catpod' cannot reopen them
    # (e.g. --vault-password-file /dev/stdin) or use the TTY for password
    # prompts. Only pipes and terminals are touched, never e.g. /dev/null.
    for FD in 0 1 2; do
        case "$(readlink "/proc/$$/fd/$FD")" in
            pipe:*|/dev/pts/*)
                chown catpod:catpod "/proc/$$/fd/$FD"
                ;;
        esac
    done

    exec su-exec catpod "$0" "$@"
fi

# Read inventory group from environment variable if available and replace
# the default group name 'kittens' in the dynamic inventory file.
# This is important for running serveral CATPOD-handled instances on the
# same host, as we don't want to add containers from seperate Docker
# applications to the same group.
#
# Check if CATPOD_INVENTORY_GROUP is set and not empty. If so, we use that as
# custom group name. Only letters, digits and underscores are allowed, as the
# value is inserted into the inventory file (and Ansible group names are
# restricted to these characters anyway).
if [ -n "$CATPOD_INVENTORY_GROUP" ]; then
    case "$CATPOD_INVENTORY_GROUP" in
        *[!A-Za-z0-9_]*)
            echo "ERROR: CATPOD_INVENTORY_GROUP may only contain letters, digits and underscores." >&2
            exit 1
            ;;
    esac

    # Set custom group name in the dynamic inventory file.
    sed -i "s/kittens/$CATPOD_INVENTORY_GROUP/g" /etc/ansible/docker.yml
fi

# The Ansible commands replace this script via exec, so their exit code
# becomes the container's exit code (e.g. a failed playbook run fails the
# container).
case "$1" in
    galaxy)
        shift
        exec /usr/bin/ansible-galaxy "$@"
        ;;
    vault)
        shift
        exec /usr/bin/ansible-vault "$@"
        ;;
    *)
        # Check Docker socket accessibility
        # The CATPOD container needs access to the Docker socket to manage
        # containers. This check helps users diagnose permission issues early.
        # Only relevant for playbook mode — vault and galaxy don't need Docker.
        # Access is normally granted automatically above (through the socket's
        # group or the socket relay); this mainly catches runs with an
        # overridden user (--user).
        #
        # Check the socket that DOCKER_HOST points to (e.g. the relay), and
        # skip the check if DOCKER_HOST points to a remote daemon (tcp://,
        # ssh://), which needs no socket.
        case "$DOCKER_HOST" in
            "")
                CHECK_SOCK="$DOCKER_SOCK"
                ;;
            unix://*)
                CHECK_SOCK="${DOCKER_HOST#unix://}"
                ;;
            *)
                CHECK_SOCK=""
                ;;
        esac

        if [ -z "$CHECK_SOCK" ]; then
            :
        elif [ -e "$CHECK_SOCK" ]; then
            # Socket exists, check if we can access it
            if ! test -r "$CHECK_SOCK" -a -w "$CHECK_SOCK"; then
                echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >&2
                echo "ERROR: Cannot access Docker socket" >&2
                echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >&2
                echo "" >&2
                echo "The Docker socket is mounted but user '$(id -un)' lacks permission" >&2
                echo "to access it. This is required for CATPOD to manage Docker containers." >&2
                echo "" >&2
                echo "CATPOD grants socket access automatically when the container is" >&2
                echo "started with its default user. If you override the user with --user," >&2
                echo "grant access to the socket's group yourself with --group-add." >&2
                echo "A socket that only root can use (e.g. with Docker Desktop on" >&2
                echo "macOS) only works without --user." >&2
                echo "" >&2
                echo "For more details, see: https://fpodschwadek.github.io/catpod/how-to-use.html" >&2
                echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >&2
                exit 1
            fi
        else
            # Socket is not mounted at all
            echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >&2
            echo "WARNING: Docker socket not found" >&2
            echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >&2
            echo "" >&2
            echo "The Docker socket is not mounted at $CHECK_SOCK." >&2
            echo "If your playbook uses Docker modules, it will fail." >&2
            echo "" >&2
            echo "Mount the socket with: -v /var/run/docker.sock:/var/run/docker.sock" >&2
            echo "" >&2
            echo "Continuing anyway (might be intentional for non-Docker playbooks)..." >&2
            echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >&2
            echo "" >&2
        fi

        exec /usr/bin/ansible-playbook "$@"
        ;;
esac
