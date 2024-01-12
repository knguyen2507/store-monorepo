FROM node:20-alpine AS base

RUN npm -g add pnpm
RUN npm install -g nx

WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM base as build
WORKDIR /usr/src/app
COPY . .
RUN nx reset
RUN pnpm nx build store-template

FROM nginx:latest as deploy
WORKDIR /usr/src/app
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /usr/local/app/dist/store-template /usr/share/nginx/html
EXPOSE 80