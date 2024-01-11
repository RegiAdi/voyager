FROM node:20-bookworm

WORKDIR /app

COPY . .
RUN npm install
CMD ["node", "build/src/index.js"]

EXPOSE 4000
