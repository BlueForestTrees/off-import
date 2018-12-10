#!/bin/ash

echo "stat dist/js/index.js"
stat node/js/index.js

#download
echo "wget -O off.tar.gz https://world.openfoodfacts.org/data/openfoodfacts-mongodbdump.tar.gz"
wget -O off.tar.gz https://world.openfoodfacts.org/data/openfoodfacts-mongodbdump.tar.gz

#extract
echo "tar -zxvf off.tar.gz"
tar -zxvf off.tar.gz

#clean download
echo "rm off.tar.gz"
rm off.tar.gz

#dump
echo "mongorestore --collection TrunkOff --db off dump/off/products.bson"
mongorestore --collection TrunkOff --db off dump/off/products.bson

#clean extract
echo "rm -rf ./dump"
rm -rf ./dump

#import bf
echo "npm run start"
npm run start