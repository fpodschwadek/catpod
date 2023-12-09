FROM python:3-alpine

RUN apk update; \
    apk upgrade; \
    apk add \
        git \
        ssh \
    ; \
    rm -f /var/cache/apk/*; \
    pip3 install --upgrade pip; \
    pip3 install --upgrade virtualenv; \
    pip3 install ansible; \
    pip3 install requests;

WORKDIR /tmp

ENTRYPOINT ["/usr/local/bin/ansible-playbook"]
