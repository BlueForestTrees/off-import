#script ci-dessous à lancer dans import-mongo pour maj la base off. Ensuite tail -f import.log
#cat > import.sh
#chmod +x import.sh
#nohup /import.sh > /log 2>&1 &
#tail -f /log
#jobs => liste les processus en Arrière plan


#!/bin/bash

#wget
apt-get update
apt-get install wget

#download
echo "wget -O off.tar.gz https://world.openfoodfacts.org/data/openfoodfacts-mongodbdump.tar.gz"
wget -O off.tar.gz https://world.openfoodfacts.org/data/openfoodfacts-mongodbdump.tar.gz

#extract
echo "tar -zxvf off.tar.gz"
tar -zxvf off.tar.gz --totals

#clean download
echo "rm off.tar.gz"
rm off.tar.gz

#dump
echo "mongorestore --collection TrunkOff --db off dump/off/products.bson"
mongorestore --drop --noIndexRestore --collection TrunkOff --db off dump/off/products.bson

#clean extract
echo "rm -rf ./dump"
rm -rf ./dump

echo "download-off done"

