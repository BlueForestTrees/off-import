FROM node:alpine AS api-builder

RUN mkdir -p /build
COPY package.json ./build/
COPY src ./build/src
COPY ./scripts ./scripts
RUN chmod -R 770 ./scripts

WORKDIR /build
RUN npm install
RUN npm run build

CMD ["./scripts/etl.sh"]