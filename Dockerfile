FROM node:alpine

LABEL "com.github.actions.name"="Github Tag Bump"
LABEL "com.github.actions.description"="Bump and push git tag on merge"
LABEL "com.github.actions.icon"="git-merge"
LABEL "com.github.actions.color"="purple"
LABEL "maintainer"="Yishai Zehavi"

RUN apk update
RUN apk upgrade
RUN apk add ca-certificates && update-ca-certificates
RUN apk add --no-cache --update \
    curl \
    unzip \
    bash \
    python \
    py-pip \
    git \
    openssh \
    make \
    jq \
    tzdata \
    sudo

RUN rm /var/cache/apk/*

RUN npm install semver -g

COPY scripts/entrypoint.sh /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]