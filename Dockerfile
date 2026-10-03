# Pinned by digest for reproducible builds; Dependabot proposes updates.
# Plain Alpine instead of the official Python image: Alpine provides Python
# and the compiled Python packages prebuilt for every platform we publish,
# so no platform has to compile them (see requirements.in).
FROM alpine:3.24.2@sha256:294b683cb724975bec92580e1e685676bd4b50bda910ddb8c51d4cabeaec77e6

COPY ansible.cfg catpod.yml docker.yml /etc/ansible/
COPY entrypoint.sh /srv/
COPY requirements.txt requirements.yml /tmp/

ARG PIP_ROOT_USER_ACTION=ignore
ARG PIP_BREAK_SYSTEM_PACKAGES=true

RUN apk update && \
    apk upgrade --available && \
    apk add --no-cache --update \
        docker-cli-compose \
        git \
        openssh-client \
        su-exec \
        tini \
        python3 \
        py3-pip \
        # Python packages with compiled code, left out of requirements.txt
        py3-cffi \
        py3-cryptography \
        py3-markupsafe \
        py3-yaml && \
    # Install pinned Python packages; every file is checked against its hash.
    pip3 install --no-cache-dir --require-hashes -r /tmp/requirements.txt && \
    # Fail the build if Alpine's packages don't satisfy Ansible's requirements.
    pip3 check && \
    # Upgrade selected collections to their newest release within the
    # version ranges in requirements.yml (no new major versions). Install
    # into the shared default path (not root's home), so the catpod user
    # sees them; it takes precedence over the collections bundled with
    # ansible.
    ansible-galaxy collection install \
        -r /tmp/requirements.yml \
        --upgrade \
        -p /usr/share/ansible/collections && \
    # Cleanup to reduce image size
    rm -rf /tmp/* \
           /root/.ansible \
           /var/cache/apk/* \
           /usr/share/man/* \
           /usr/share/doc/* \
           /usr/lib/python*/ensurepip \
           /usr/lib/python*/idlelib \
           /usr/lib/python*/turtle* \
           /usr/lib/python*/test \
           /usr/lib/python*/tkinter && \
    chmod +x /srv/entrypoint.sh && \
    # Add catpod user and group with specific UID/GID
    addgroup -g 10999 catpod && \
    adduser -D -u 10999 -G catpod catpod && \
    # Give appropriate permissions
    chown -R catpod:catpod /srv && \
    chown -R catpod:catpod /etc/ansible

WORKDIR /srv
# No USER instruction: the entrypoint starts as root only to grant the
# 'catpod' user access to the Docker socket, then switches to 'catpod'.

# tini runs as PID 1 and forwards signals (e.g. SIGTERM from `docker stop`) to
# the whole process group, so Ansible and its workers can shut down cleanly.
# -s keeps tini working when it isn't PID 1 (e.g. with `docker run --init`).
ENTRYPOINT ["/sbin/tini", "-s", "-g", "--", "/srv/entrypoint.sh"]
