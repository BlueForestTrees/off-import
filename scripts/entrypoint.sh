#!/usr/bin/env bash

set -e

printf "\n[-] Starting local MongoDB...\n\n"
exec mongod --storageEngine=wiredTiger &


# Set a delay to wait to start the Node process
if [[ $STARTUP_DELAY ]]; then
  echo "Delaying startup for $STARTUP_DELAY seconds..."
  sleep $STARTUP_DELAY
fi

#download
printf "\ncurl https://world.openfoodfacts.org/data/openfoodfacts-mongodbdump.tar.gz --output off.tar.gz"
curl curl https://world.openfoodfacts.org/data/openfoodfacts-mongodbdump.tar.gz --output off.tar.gz --output off.tar.gz

#extract
printf "tar -zxvf off.tar.gz"
tar -zxvf off.tar.gz

#clean download
printf "rm off.tar.gz"
rm off.tar.gz

#dump
printf "mongorestore --collection TrunkOff --db off dump/off/products.bson"
mongorestore --collection TrunkOff --db off dump/off/products.bson

#clean extract
printf "rm -rf ./dump"
rm -rf ./dump

#import bf
printf "npm run start"
npm run start