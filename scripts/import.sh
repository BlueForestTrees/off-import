#!/usr/bin/env bash

curl https://world.openfoodfacts.org/data/openfoodfacts-mongodbdump.tar.gz --output off.tar.gz #download
tar -zxvf off.tar.gz #extract
rm off.tar.gz #clean download

mongorestore --collection TrunkOff --db off dump/off/ #dump
rm -rf ./tmp/$OFF_DUMP_NAME #clean extract
npm run start #import bf
mongo delete #clean dump

