#!/bin/bash

#download
echo "wget -O off.tar.gz https://world.openfoodfacts.org/data/openfoodfacts-mongodbdump.tar.gz"
wget -O off.tar.gz https://world.openfoodfacts.org/data/openfoodfacts-mongodbdump.tar.gz

#extract
echo "tar -zxvf off.tar.gz"
tar -zxvf off.tar.gz

#run
node dist/index.js