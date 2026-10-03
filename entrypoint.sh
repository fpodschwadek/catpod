#!/bin/ash

DOCKER_SOCK="/var/run/docker.sock"

# The container starts as root only to grant the 'catpod' user access to the
# mounted Docker socket. The socket's group ID differs between hosts, so we
# read it at runtime instead of requiring users to pass --group-add (which
# needs host-specific commands, e.g. GNU vs. BSD stat). Afterwards, the script
# re-executes itself as 'catpod'; nothing else is done as root.
if [ "$(id -u)" = "0" ]; then
    if [ -S "$DOCKER_SOCK" ]; then
        SOCK_GID=$(stat -c '%g' "$DOCKER_SOCK")

        # Never add 'catpod' to the root group. If the socket belongs to GID 0
        # (e.g. with some Docker Desktop setups), it is either accessible
        # without group membership or the check below reports the problem.
        if [ "$SOCK_GID" != "0" ]; then
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
        exec /usr/local/bin/ansible-galaxy "$@"
        ;;
    vault)
        shift
        exec /usr/local/bin/ansible-vault "$@"
        ;;
    *)
        # Check Docker socket accessibility
        # The CATPOD container needs access to the Docker socket to manage
        # containers. This check helps users diagnose permission issues early.
        # Only relevant for playbook mode — vault and galaxy don't need Docker.
        # Access is normally granted automatically above; this mainly catches
        # runs with an overridden user (--user) or a root-owned socket.
        if [ -e "$DOCKER_SOCK" ]; then
            # Socket exists, check if we can access it
            if ! test -r "$DOCKER_SOCK" -a -w "$DOCKER_SOCK"; then
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
            echo "The Docker socket is not mounted at $DOCKER_SOCK." >&2
            echo "If your playbook uses Docker modules, it will fail." >&2
            echo "" >&2
            echo "Mount the socket with: -v /var/run/docker.sock:/var/run/docker.sock" >&2
            echo "" >&2
            echo "Continuing anyway (might be intentional for non-Docker playbooks)..." >&2
            echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >&2
            echo "" >&2
        fi

        exec /usr/local/bin/ansible-playbook "$@"
        ;;
esac
