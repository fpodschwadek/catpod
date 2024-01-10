# PROGRESS_NO_TRUNC=1 docker build -t fpod/catpod --progress plain --no-cache .
FROM python:3-alpine

RUN apk update; \
    apk upgrade; \
    apk add --no-cache \
        docker-cli-compose \
        git \
        openssh-client \
    ; \
    pip3 install --upgrade pip; \
    pip3 install --upgrade virtualenv; \
    pip3 install ansible; \
    pip3 install docker; \
    pip3 install requests; \
    pip3 install python-memcached;

COPY ansible.cfg /etc/ansible/ansible.cfg
COPY catpod.yml /etc/ansible/catpod.yml
COPY docker.yml /etc/ansible/docker.yml

WORKDIR /srv

ENTRYPOINT ["/usr/local/bin/ansible-playbook"]
