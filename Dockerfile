FROM mongo:3.6.5

RUN groupadd -r node && useradd -m -g node node

ENV NODE_VERSION 8.4.0
ENV GOSU_VERSION 1.10

# build directories
ENV BUILD_SCRIPTS_DIR /opt/build_scripts

# add entrypoint and build scripts
COPY scripts $BUILD_SCRIPTS_DIR
RUN chmod -R 770 $BUILD_SCRIPTS_DIR

# install base dependencies, build app, cleanup
RUN cd $BUILD_SCRIPTS_DIR && \
		bash $BUILD_SCRIPTS_DIR/install-node.sh



RUN mkdir -p /build
COPY package.json ./build/
COPY src ./build/src

WORKDIR /build
RUN npm install
RUN npm run build

# start the app
ENTRYPOINT ["./entrypoint.sh"]
CMD ["node", "run", "start"]

#sudo mkdir -p /var/lib/trees/off/targz
#sudo mkdir -p /var/lib/trees/off/unzipped

#sudo curl https://world.openfoodfacts.org/data/openfoodfacts-mongodbdump.tar.gz -o /var/lib/trees/off/targz/off.tar.gz

#sudo tar -xzf /var/lib/trees/off/targz/off.tar.gz -C /var/lib/trees/off/unzipped

# depuis container mongo:
# volume /var/lib/trees/off/unzipped/dump/off:/off
# mongorestore -d off -c TrunkOff /off/products.bson
