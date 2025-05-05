# DOCKER_BUILDKIT=1 PROGRESS_NO_TRUNC=1 docker build --platform=linux/amd64,linux/amd64/v2,linux/amd64/v3,linux/arm64,linux/ppc64le,linux/arm/v7,linux/arm/v6 -t fpod/catpod:latest --progress plain --no-cache .
FROM python:3.13-alpine

COPY ansible.cfg catpod.yml docker.yml /etc/ansible/
COPY entrypoint.sh /srv/

ARG PIP_ROOT_USER_ACTION=ignore
ARG PIP_BREAK_SYSTEM_PACKAGES=true

RUN apk update; \
    apk upgrade --available; \
    apk add --no-cache --update \
        docker-cli-compose \
        git \
        openssh-client \
    ; \
    # Continue with other installations
    pip install --upgrade pip; \
    pip3 install ansible; \
    pip3 install docker; \
    pip3 install requests; \
    pip3 install python-memcached; \
    # Make sure that we have the latest version of relevant
    # collections. This is not always the case for collections
    # that are automatically co-installed.
    ansible-galaxy collection install \
        community.docker \
        --upgrade \
    ; \
    chmod +x /srv/entrypoint.sh; \
    # Add catpod user and group with specific UID/GID
    addgroup -g 10999 catpod; \
    adduser -D -u 10999 -G catpod catpod; \
    # Give appropriate permissions
    chown -R catpod:catpod /srv; \
    chown -R catpod:catpod /etc/ansible;

WORKDIR /srv
# Switch to non-root user
USER catpod

ENTRYPOINT ["/srv/entrypoint.sh"]
