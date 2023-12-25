---
home: true
---

# What is CATPOD?

CATPOD stands for Containerised Ansible Tool for Provisioning, Orchestration and Deployment. It is basically Ansible in a container.

The central idea behind it is that you can use Ansible in a Docker container to deploy or provision other Docker containers on the same host without having to install Ansible on the host itself. 

With the right setup, it's even possible to run tasks on the host itself from the CATPOD container.

## Do You Need It?

If you work with or as part of a well-staffed DevOps team with a robust deployment infrastructure in place, you probably won't need CATPOD. Neither will you need it if you have a single Docker application to manage.

However, if you need to take care of several applications, and if you want to keep the number of tools to a minimum, CATPOD might be for you. 

## Required Prior Knowledge

Because CATPOD is Ansible in a container, you need to have basic knowledge of Ansible. Mainly of how to use playbooks and roles:

https://docs.ansible.com/ansible/latest/playbook_guide/index.html

And you need to know how to use Docker (and, depending on your use case, Docker Compose):

https://docs.docker.com/reference/


