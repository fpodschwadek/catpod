#!/bin/ash

# Check Docker socket accessibility
# The CATPOD container needs access to the Docker socket to manage containers.
# This check helps users diagnose permission issues early.
DOCKER_SOCK="/var/run/docker.sock"

if [ -e "$DOCKER_SOCK" ]; then
    # Socket exists, check if we can access it
    if ! docker info > /dev/null 2>&1; then
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >&2
        echo "ERROR: Cannot access Docker socket" >&2
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >&2
        echo "" >&2
        echo "The Docker socket is mounted but the 'catpod' user lacks permission" >&2
        echo "to access it. This is required for CATPOD to manage Docker containers." >&2
        echo "" >&2
        echo "SOLUTION:" >&2
        echo "Run the container with the --group-add flag to grant socket access:" >&2
        echo "" >&2
        echo "  docker run -it \\" >&2
        echo "    -v /var/run/docker.sock:/var/run/docker.sock \\" >&2
        echo "    -v ./playbook.yml:/srv/playbook.yml \\" >&2
        echo "    --group-add \$(stat -c '%g' /var/run/docker.sock) \\" >&2
        echo "    --rm fpod/catpod /srv/playbook.yml" >&2
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

# Read inventory group from environment variable if available and replace
# the default group name 'kittens' in the dynamic inventory file.
# This is important for running serveral CATPOD-handled instances on the
# same host, as we don't want to add containers from seperate Docker
# applications to the same group.
#
# Check if CATPOD_INVENTORY_GROUP is set and not empty. If so, we use that as
# custom group name.
if [[ -n "$CATPOD_INVENTORY_GROUP" ]]; then
    # Set custom group name in the dynamic inventory file.
    sed -i "s/kittens/$CATPOD_INVENTORY_GROUP/g" /etc/ansible/docker.yml
fi

case "$1" in
    galaxy)
        shift
        /usr/local/bin/ansible-galaxy "$@"
        exit 0
        ;;
    vault)
        shift
        /usr/local/bin/ansible-vault "$@"
        exit 0
        ;;
    *)
        /usr/local/bin/ansible-playbook "$@"
        exit 0
        ;;
esac
