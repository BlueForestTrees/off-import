FROM node:alpine

COPY package.json .
COPY src ./src

RUN npm install
RUN npm run build