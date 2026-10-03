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
        docker-cli \
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
    # Docker Compose from Alpine's edge repository: stable Alpine releases
    # keep the Compose version they shipped with, including its compiled-in
    # Go libraries, which accumulate known vulnerabilities. Installed on its
    # own, so nothing else comes from edge; its only dependency, docker-cli,
    # is already installed from the stable release above.
    apk add --no-cache \
        --repository=https://dl-cdn.alpinelinux.org/alpine/edge/community \
        docker-cli-compose && \
    # Install pinned Python packages; every file is checked against its hash.
    # This also fails if one of Alpine's py3-* packages doesn't satisfy a
    # requirement: pip would then have to install it, which --require-hashes
    # refuses for anything not pinned in requirements.txt. (No `pip3 check`:
    # it rejects Alpine's 32-bit ARM packages, whose metadata names the
    # 64-bit build machine's platform, armv8l.)
    pip3 install --no-cache-dir --require-hashes -r /tmp/requirements.txt && \
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
