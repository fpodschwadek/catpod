#!/bin/ash

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
