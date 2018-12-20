#!/bin/bash

#wget
apt-get update
apt-get install wget

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

echo "download-off done"

#dans import-mongo
#cat > import.sh
#chmod +x import.sh
#nohup /import.sh > /import.log 2>&1 &
#jobs => liste les processus en Arrière plan