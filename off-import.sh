#download
printf "wget -O off.tar.gz https://world.openfoodfacts.org/data/openfoodfacts-mongodbdump.tar.gz"
wget -O off.tar.gz https://world.openfoodfacts.org/data/openfoodfacts-mongodbdump.tar.gz

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