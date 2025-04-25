---
title: What is CATPOD?
---

# What is CATPOD?

The acronym CATPOD stands for **Containerised Ansible Tool for Provisioning, Orchestration and Deployment**. It is basically Ansible in a container.

The central idea behind it is that you can use Ansible in a Docker container to deploy or provision other Docker containers on the same host without having to install Ansible on the host itself. 

With the right setup, it's even possible to run tasks on the host itself from the CATPOD container.

## Motivation

What led to this development is my work on Docker applications that grew in complexity but needed to remain simple to set up and maintain for team members who didn't (and needn't) know the whole application in all its details. Working in a Digital Humanities context, most of them had only limited Docker and Ansible experience, if at all. Requirements to learn more about these technologies as well as requirements to install additional software beyond Docker on their machines needed to be kept to a minimum.

Similarly, I also like the idea of executing Ansible on a production machine without to deploy a complex Docker application without first having to install Ansible itself. Particularly if you only have limited influence on the server setup, this can be a bonus. If your server has a Docker Engine installed, you can run CATPOD.

## Do You Need It?

If you work with or as part of a well-staffed DevOps team with a robust deployment infrastructure in place, you probably won't need CATPOD. Neither will you need it if you have a single Docker application to manage.

However, if you need to take care of several applications, and if you want to keep the number of tools to a minimum, CATPOD might be for you. 

## Required Prior Knowledge

Because CATPOD is Ansible in a container, you need to have basic knowledge of Ansible. Mainly of how to use playbooks and roles:

[https://docs.ansible.com/ansible/latest/playbook_guide/index.html](https://docs.ansible.com/ansible/latest/playbook_guide/index.html)

And you need to know how to use Docker (and, depending on your use case, Docker Compose):

[https://docs.docker.com/reference/](https://docs.docker.com/reference/)


