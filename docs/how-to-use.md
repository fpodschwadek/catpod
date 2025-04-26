---
title: How to Use
---

# How to Use

## Getting Started

Using a CATPOD container to orchestrate other Docker containers on the same host is fairly straightforward. You only need a suitable [Ansible playbook](https://docs.ansible.com/ansible/latest/playbook_guide/index.html). For a first example, create a file named `test.yml` with the following content (or use the [file from the GitHub repository](https://raw.githubusercontent.com/fpodschwadek/catpod/refs/heads/main/test.yml)):

```yml
---
  - name: Test Playbook
    hosts: localhost
    connection: local
    tasks:

      - name: Start a Docker service
        community.docker.docker_container:
          name: hello-world
          image: hello-world
```

From within CATPOD, you can use the Ansible `docker` Community collection to handle Docker containers on the host, as you can see in the example task here.

With this example playbook, we can run a CATPOD container to start a [Docker *Hello World*](https://hub.docker.com/_/hello-world) container with the following command:

```sh
docker run -it \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v ./test.yml:/tmp/test.yml --rm fpod/catpod /tmp/test.yml
```

We need to mount two volumes into the CATPOD container:

**First mount:** `-v /var/run/docker.sock:/var/run/docker.sock`

`/var/run/docker.sock` is the path to the Docker socket. By mounting the host socket path to the socket path inside the container, Docker commands inside the container will be relayed to the socket on the host, allowing the CATPOD container to interact with other containers on the host (an idea that is described in [this blog post by Jérôme Petazzoni](https://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/#the-socket-solution) and used widely nowadays for pseudo-Docker-in-Docker settings).

**Second mount:** `-v ./test.yml:/tmp/test.yml`

This is your example playbook that needs to be mounted into the container for the Ansible instance inside the container to use. Note that it does not matter where exactly in the container the file is mounted, as you specify the full file path in the container command anyway. However, `tmp` is a safe location without any risks of name collisions or overwriting existing files.

It is recommended to use the `--rm` option to remove the CATPOD container after it has run the playbook, otherwise you'll end up with an idle container hanging around.

**Container Command:** `/tmp/test.yml`

To run a playbook, the container command is the path to the mounted playbook file inside the container, in this case `/tmp/test.yml`. If you use a different mount path, e.g., `-v ./test.yml:/var/test.yml`, your container command would refer to that path, `/var/test.yml`. 

Passing the playbook path as command prompts the container to internally use the `ansible-playbook` binary to run the playbook. CATPOD provides other options, described later in this chapter.

This is, of course, a toy example of how to use CATPOD; you don't really need a utility container to start another simple container. Have a look at the [Use Cases chapter](use-cases.html) for more complex examples.

## Container Commands Overview

### `{ playbook path }`

As noted, providing the path to a playbook as a container command will prompt `ansible-playbook` to run the playbook. You can find more details here: [https://docs.ansible.com/ansible/latest/cli/ansible-playbook.html](https://docs.ansible.com/ansible/latest/cli/ansible-playbook.html)

This is used just like in the example above:

```sh
docker run -it \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v ./test.yml:/tmp/test.yml --rm fpod/catpod /tmp/test.yml
```

Beyond this, CATPOD provides (as of now) access to `ansible-galaxy` and `ansible-vault`.

### `galaxy`

The `galaxy` command allows you to download and install collections (and to build and publish your own). You can find more details here: [https://docs.ansible.com/ansible/latest/cli/ansible-galaxy.html](https://docs.ansible.com/ansible/latest/cli/ansible-galaxy.html)

You can run this container command like `ansible-galaxy` itself, e.g., for downloading a collection:

```sh
docker run -it \
  -v ./local_collections:/tmp/local_collections \
  --rm fpod/catpod \
    galaxy collection download my_namespace.my_collection \
    -p /tmp/local_collections
```

Note that you don't need to mount the Docker socket or any playbooks for this, but it makes sense to mount a host directory where downloaded (or installed) collections are persisted, otherwise they will be gone once the CATPOD container is removed. 

In the above example, the local `local_collections` is mounted into the container at `/tmp/local_collections` and the mount is passed as download path (with the `-p` option) to `ansible-galaxy` in the container command.

### `vault`

The `vault` command allows to encrypt variables and files that can be used in Ansible playbooks. You can find more details here: [https://docs.ansible.com/ansible/latest/cli/ansible-vault.html](https://docs.ansible.com/ansible/latest/cli/ansible-vault.html)

You can run this container command like `ansible-vault` itself, e.g, for encrypting a string containing an access token:

```sh
docker run -it fpod/catpod vault \
  encrypt_string 'secret-access-token' --name 'encrypted_token'
```

You are then prompted to enter a vault password (this password will later need to be known to your playbook in order to decrypt the token value).

Once you entered and confirmed a password, you get the entry for the encrypted value that you can use in your playbooks; here's an example using the password `foo`:

```sh
Encryption successful
encrypted_token: !vault |
          $ANSIBLE_VAULT;1.1;AES256
          37363638653461663238643433646166336563653439656666303464353331393932653332643033
          3064313364383764636238383139663430646563663864620a396565366633613833653035613762
          31626265326363343339386162373363623232666333346636396430636337646539376362663739
          6232353164336239630a383436643661396231346231663533366431633839633737363261373362
          33376336653061633766393461313233383139356561353037346439346266323630
```
