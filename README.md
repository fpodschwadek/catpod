# CATPOD (Containerised Ansible Tool for Provisioning, Orchestration and Deployment)

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/fpodschwadek/catpod/docker-image-push.yml?logo=github)](https://github.com/fpodschwadek/catpod/actions/workflows/docker-image-push.yml)
[![Docker Image Last Updated](https://img.shields.io/docker/last-updated/fpod/catpod?logo=docker&label=Docker%20image%20last%20updated)](https://hub.docker.com/r/fpod/catpod)
[![Docker Image Version](https://img.shields.io/docker/v/fpod/catpod?logo=docker&label=Docker%20image%20version)](https://hub.docker.com/r/fpod/catpod)
[![Docker Image Size](https://img.shields.io/docker/image-size/fpod/catpod?logo=docker&label=Docker%20image%20size)](https://hub.docker.com/r/fpod/catpod)

<p align="center">
    <img src="https://github.com/fpodschwadek/catpod/blob/main/CATPOD_logo.png" alt="CATPOD logo" width="180">
</p>

CATPOD is [Ansible](https://docs.ansible.com/) in a container for automated provisioning, orchestration and deployment tasks. (You can think of it as a minimalist [Jenkins](https://www.jenkins.io/doc/)-like tool without the Java.)

You can find this project on GitHub: [https://github.com/fpodschwadek/catpod/](https://github.com/fpodschwadek/catpod/)

CATPOD Docs: https://fpodschwadek.github.io/catpod/

## The Basic Idea

The basic idea behind CATPOD is to have a container that can be run on demand to execute Ansible playbooks without having Ansible to be installed on a particular machine.

What led to this development is my work on Docker applications that grew in complexity but needed to remain simple to set up and maintain for team members who didn't (and needn't) know the whole application in all its details. Working in a Digital Humanities context, most of them had only limited Docker and Ansible experience, if at all. Requirements to learn more about these technologies as well as requirements to install additional software beyond Docker on their machines needed to be kept to a minimum.

Similarly, I also like the idea of executing Ansible on a production machine to deploy a complex Docker application without first having to install Ansible itself.

## Deploying Containers From Within a Container

These days, lots of stuff is done with Docker (or Podman, or whatever your favourite is) containers. While there are [plenty of modules for handling Docker with Ansible](https://docs.ansible.com/ansible/latest/collections/community/docker/index.html), using these _inside_ of the CATPOD container would not help much -- after all, CATPOD is used to handle Docker applications on the same host it is running on itself.

To do this, we need to mount the Docker socket of the host system into the CATPOD container. We can then use it to create and provision containers for other applications on the host system (see [Jérôme Petazzoni's Post](https://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/#the-socket-solution) for this wonderfully simple strategy).

## Supported Platforms

The `fpod/catpod` image is published for several platforms under the same tag; Docker automatically pulls the image for your machine.

| Platform | Support |
|---|---|
| `linux/amd64`, `linux/arm64` (incl. Apple Silicon Macs) | Fully tested on every release |
| `linux/386`, `linux/arm/v7`, `linux/arm/v6` (e.g. Raspberry Pi), `linux/ppc64le`, `linux/s390x`, `linux/riscv64` | Best effort: built and smoke-tested on every release |

For any other platform, build the image yourself from the Dockerfile.

## Examples

For now, there's only one measly example but more (for more complex cases) will be following soon.

### Creating a Single Container

Here, CATPOD uses the [test playbook](https://github.com/fpodschwadek/catpod/blob/main/test.yml) to create a container from the Docker `hello-world` image and removes itself when done.

```bash
docker run -it -v /var/run/docker.sock:/var/run/docker.sock -v ./test.yml:/tmp/test.yml --rm fpod/catpod /tmp/test.yml
```

Note that the file path used at the end of this command refers to the path inside the CATPOD container the file was mounted to, in this case `/tmp/test/yml`.

## Vault

You can use CATPOD to encrypt data with Ansible Vault by using the `vault` followed by anything you would use with locally installed `ansible-vault`. For example, you can use the following command to encrypt a string:

```bash
docker run -it fpod/catpod vault encrypt_string '<variable value>' --name '<variable key>'
```

(For more details see https://docs.ansible.com/ansible/latest/vault_guide/vault_encrypting_content.html#creating-encrypted-variables.)

## Profiling

To enable task profiling for a run, pass the `ANSIBLE_CALLBACKS_ENABLED` environment variable:

```bash
docker run -it \
  -e ANSIBLE_CALLBACKS_ENABLED=profile_tasks,timer \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v ./playbook.yml:/srv/playbook.yml \
  --rm fpod/catpod /srv/playbook.yml
```

This enables the `profile_tasks` and `timer` callbacks for that single run, showing per-task execution times and a total elapsed time summary.

## Hardening

CATPOD also runs with all Linux capabilities dropped except the four its startup needs:

```bash
docker run -it --cap-drop ALL --cap-add CHOWN --cap-add SETUID --cap-add SETGID --cap-add KILL --security-opt no-new-privileges -v /var/run/docker.sock:/var/run/docker.sock -v ./test.yml:/tmp/test.yml --rm fpod/catpod /tmp/test.yml
```

See the [docs](https://fpodschwadek.github.io/catpod/how-to-use.html#optional-hardening) for what each option does. Note that access to the Docker socket is equivalent to root access on the host, so only run playbooks you trust.

## Testing

To run the test suite locally:

```bash
./test.sh
```

This builds the Docker image and runs all tests (binary checks, entrypoint command modes, socket diagnostics, Ansible configuration, user permissions, and inventory group substitution). To skip the build and test against an existing image:

```bash
./test.sh --no-build
```

## Roadmap

What is going to happen next?

- More example cases
- Integrated Webhooks server with Ansible Runner
- Integrated default Ansible playbooks/roles and/or scripts

When? Hopefully soon.

## Credits

CATPOD is largely based on work I do for the [Digital Academy at the Academy of Sciences and Literature | Mainz](https://www.adwmainz.de/en/digitalitaet/digitale-akademie.html) and for the [Zeitschrift für Praktische Philosophie](https://www.praktische-philosophie.org). Thanks to the people involved for letting me tinkering along on weird solutions that surprisingly work (most of the time).

Logo made with DALL-E and edited manually. Teaser image made with DALL-E.

## License

EUPL 1.2

![CATPOD teaser](https://github.com/fpodschwadek/catpod/blob/main/CATPOD_teaser.jpg)
