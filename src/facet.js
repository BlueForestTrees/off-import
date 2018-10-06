import {createObjectId} from "mongo-registry"
import {isNil} from "lodash"

const debug = require('debug')('api:off-import:facet')

export const toFacet = (quantity, trunkId, off, entries, keys, writes) => {
    const nutriments = off.nutriments
    for (let i = 0; i < keys.length; i++) {
        const entry = entries[keys[i]]
        const externId = entry.externId
        const facetId = entry._id
        const _100g = nutriments[externId + "_100g"]
        if (!isNil(_100g)) {
            // Curieux les coefs sont les mêmes pour l'énergie et pour les masses, on garde un seul code :)
            // autres
            // Mass: x g/100g => y kg/1kg => y = x * 0.01
            // Volu: x g/100ml => y kg/1m3 => y = x * 10
            // energy
            // Mass: x kJ/100g => y MJ/1kg => y = x * 0.01
            // Volu: x kJ/100ml => y MJ/1m3 => y = y * 10
            // debug("%o tid=%o fid=%o eid=%o g/100g=%o bqt=%o %o", off._id, trunkId, facetId, externId, _100g, bqt, quantity)
            const bqt = quantity.g === "Mass" ? _100g * 0.01 : _100g * 10
            writes.push({
                updateOne: {
                    filter: {trunkId, facetId},
                    update: {
                        $set: {
                            trunkId, facetId, bqt
                        },
                        $setOnInsert: {
                            _id: createObjectId()
                        }
                    },
                    upsert: true
                }
            })
        }
    }
}