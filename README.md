# CATPOD (Containerised Ansible Tool for Provisioning, Orchestration and Deployment)

<p align="center">
    <img src="https://github.com/fpodschwadek/catpod/blob/main/CATPOD_logo.png" alt="CATPOD logo" width="180">
</p>

CATPOD is [Ansible](https://docs.ansible.com/) in a container for automated provisioning, orchestration and deployment tasks. (You can think of it as a minimalist [Jenkins](https://www.jenkins.io/doc/)-like tool without the Java.)

You can find this project on GitHub: [https://github.com/fpodschwadek/catpod/](https://github.com/fpodschwadek/catpod/)

## The Basic Idea

The basic idea behind CATPOD is to have a container that can be run on demand to execute Ansible playbooks without having Ansible to be installed on a particular machine.

What led to this development is my work on Docker applications that grew in complexity but needed to remain simple to set up and maintain for team members who didn't (and needn't) know the whole application in all its details. Working in a Digital Humanities context, most of them had only limited Docker and Ansible experience, if at all. Requirements to learn more about these technologies as well as requirements to install additional software beyond Docker on their machines needed to be kept to a minimum.

Similarly, I also like the idea of executing Ansible on a production machine to deploy a complex Docker application without first having to install Ansible itself.

## Deploying Containers From Within a Container

These days, lots of stuff is done with Docker (or Podman, or whatever your favourite is) containers. While there are [plenty of modules for handling Docker with Ansible](https://docs.ansible.com/ansible/latest/collections/community/docker/index.html), using these _inside_ of the CATPOD container would not help much -- after all, CATPOD is used to handle Docker applications on the same host it is running on itself.

To do this, we need to mount the Docker socket of the host system into the CATPOD container. We can then use it to create and provision containers for other applications on the host system (see [Jérôme Petazzoni's Post](https://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/#the-socket-solution) for this wonderfully simple strategy).

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
