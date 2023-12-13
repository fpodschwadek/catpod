# PROGRESS_NO_TRUNC=1 docker build -t fpod/ansible-docker --progress plain --no-cache .
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
    pip3 install requests;

WORKDIR /srv

ENTRYPOINT ["/usr/local/bin/ansible-playbook"]
