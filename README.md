# Ansible Docker

Work in progress.

This is basically going to be a CI service container for provisioning and handling containers on the host.

For this, it mounts the Docker socket on the host system, and uses it to create and provision containers for other applications.

See https://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/#the-socket-solution for the basic idea.

An example with the test playbook:

```
docker run -it -v /var/run/docker.sock:/var/run/docker.sock -v ./tes
t.yml:/tmp/test.yml --rm ansible-docker test.yml
```

Here, the Ansible Docker container will create a container from the Docker hello-world image remove itself when done.
