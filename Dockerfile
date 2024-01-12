FROM node:20-bookworm as base

WORKDIR /home/node/app

COPY package.json package-lock.json ./
RUN npm install
CMD npm run watch
