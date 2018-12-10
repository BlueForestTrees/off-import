FROM node:alpine AS api-builder

RUN mkdir -p /build
COPY package.json ./build/
COPY src ./build/src
COPY ./scripts ./scripts

WORKDIR /build
RUN npm install
RUN npm run build

ENTRYPOINT ["./scripts/etl.sh"]
