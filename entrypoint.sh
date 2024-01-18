#!/bin/ash
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
