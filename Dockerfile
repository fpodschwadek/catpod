# DOCKER_BUILDKIT=1 PROGRESS_NO_TRUNC=1 docker build --platform=linux/amd64,linux/amd64/v2,linux/amd64/v3,linux/arm64,linux/ppc64le,linux/arm/v7,linux/arm/v6 -t fpod/catpod:latest --progress plain --no-cache .
FROM python:3.13-alpine

COPY ansible.cfg catpod.yml docker.yml /etc/ansible/
COPY entrypoint.sh /srv/

ARG PIP_ROOT_USER_ACTION=ignore
ARG PIP_BREAK_SYSTEM_PACKAGES=true

RUN apk update && \
    apk upgrade --available && \
    apk add --no-cache --update \
        docker-cli \
        git \
        openssh-client \
    ; \
    # Install Docker Compose from official source
    DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep -o '"tag_name": "[^"]*' | grep -o '[^"]*$') && \
    curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-linux-x86_64" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose && \
    # Create a symlink to the CLI plugins directory
    mkdir -p /usr/libexec/docker/cli-plugins && \
    ln -s /usr/local/bin/docker-compose /usr/libexec/docker/cli-plugins/docker-compose && \
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
    addgroup -g 10999 catpod && \
    adduser -D -u 10999 -G catpod catpod; \
    # Give appropriate permissions
    chown -R catpod:catpod /srv

WORKDIR /srv
# Switch to non-root user
USER catpod

ENTRYPOINT ["/srv/entrypoint.sh"]
