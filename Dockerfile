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
RUN pnpm nx build admin-template --base-href quan-ly
RUN pnpm nx build shop-template --base-href cua-hang

FROM nginx:latest as deploy
WORKDIR /usr/src/app
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /usr/src/app/dist/apps/template/admin-template /usr/share/nginx/html/quan-ly
COPY --from=build /usr/src/app/dist/apps/template/shop-template /usr/share/nginx/html/cua-hang
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80