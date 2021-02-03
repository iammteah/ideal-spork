FROM node:10.13.0-slim as builder
WORKDIR /app
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
COPY package.json yarn.lock /app/
RUN yarn install
COPY src /app/src/
ADD evaluation.sqlite /app/evaluation.sqlite
CMD node src/start.js
