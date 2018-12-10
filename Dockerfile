FROM node:alpine AS api-builder

RUN mkdir -p /build
COPY package.json ./build/
COPY src ./build/src
COPY off-import.sh ./off-import.sh
RUN chmod -R 770 ./off-import.sh

WORKDIR /build
RUN npm install
RUN npm run build

CMD ["./off-import.sh"]