FROM node:18-alpine as build-alpine

WORKDIR /bookmarks

COPY ./dev-ops/entrypoint.sh ./entrypoint.sh
COPY .. .

RUN yarn install --frozen-lockfile
RUN yarn build:server


FROM node:18-alpine
# ARG from docker action build-args
ARG BOOKMARKS_GOOGLE_CALLBACK_URL
ARG BOOKMARKS_GOOGLE_CLIENT_ID
ARG BOOKMARKS_GOOGLE_CLIENT_SECRET

# host.docker.internal indicates docker contaniner ip
ENV BOOKMARKS_DB_HOST=host.docker.internal

#env from arguments
ENV BOOKMARKS_GOOGLE_CALLBACK_URL=$BOOKMARKS_GOOGLE_CALLBACK_URL
ENV BOOKMARKS_GOOGLE_CLIENT_ID=$BOOKMARKS_GOOGLE_CLIENT_ID
ENV BOOKMARKS_GOOGLE_CLIENT_SECRET=$BOOKMARKS_GOOGLE_CLIENT_SECRET

WORKDIR /bookmarks

RUN apk update && apk add bash

COPY --from=build-alpine /bookmarks/ ./

EXPOSE 3000
EXPOSE 27017

ENTRYPOINT ./entrypoint.sh
