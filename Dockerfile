FROM node:alpine

COPY package.json .
COPY src ./src
COPY off-import.sh ./off-import.sh

RUN chmod -R 770 ./off-import.sh
RUN npm install
RUN npm run build