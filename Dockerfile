FROM node:alpine AS api-builder

RUN mkdir -p /build
COPY package.json ./build/
COPY src ./build/src

WORKDIR /build
RUN npm install
RUN npm run build

FROM node:alpine
COPY --from=api-builder /build/package.json ./
COPY --from=api-builder /build/dist/js ./
COPY --from=api-builder /build/node_modules ./node_modules

ENTRYPOINT ["npm","run","start"]

#sudo mkdir -p /var/lib/trees/off/targz
#sudo mkdir -p /var/lib/trees/off/unzipped

#sudo curl https://world.openfoodfacts.org/data/openfoodfacts-mongodbdump.tar.gz -o /var/lib/trees/off/targz/off.tar.gz

#sudo tar -xzf /var/lib/trees/off/targz/off.tar.gz -C /var/lib/trees/off/unzipped

# depuis container mongo:
# volume /var/lib/trees/off/unzipped/dump/off:/off
# mongorestore -d off -c TrunkOff /off/products.bson