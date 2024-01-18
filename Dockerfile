# PROGRESS_NO_TRUNC=1 docker build -t fpod/catpod --progress plain --no-cache .
FROM python:3-alpine

COPY ansible.cfg catpod.yml docker.yml /etc/ansible/
COPY entrypoint.sh /srv/

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
    pip3 install python-memcached; \
    chmod +x /srv/entrypoint.sh

WORKDIR /srv

ENTRYPOINT ["/srv/entrypoint.sh"]
