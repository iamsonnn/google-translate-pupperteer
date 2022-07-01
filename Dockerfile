FROM node:16.13-alpine

# Create work directory
WORKDIR /usr/src/app

RUN apk add --no-cache \
    udev \
    chromium \
    poppler-utils

COPY ./package.json /usr/src/app
COPY ./package-lock.json /usr/src/app

# Install app dependencies
RUN npm i

ENV APP_NAME google-bot
ENV APP_PORT 5665
ENV APP_HOST localhost
ENV APP_SCHEMA http

# Copy app source to work directory
COPY . /usr/src/app

RUN npm start build
CMD npm start serve

