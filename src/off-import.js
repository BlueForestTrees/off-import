import {cols} from "./collections"
import {createObjectId} from "mongo-registry"

const debug = require('debug')('api:off-import')


export const offImport = async ([offDb, bfDb]) => {
    let offCol = offDb.collection(cols.OFF)
    let trunks = bfDb.collection(cols.TRUNK)

    const offFields = {code: 1, ingredients_text: 1, stores: 1, countries_tags: 1, last_modified_t: 1, quantity: 1, categories_tags: 1, categories_hierarchy: 1, nutriments: 1, product_name: 1, generic_name: 1}

    debug(`documents off:`, await offCol.countDocuments())
    debug(`documents bf:`, await trunks.countDocuments())

    let bfWrites = []
    let i = 0

    offCol.find({}, offFields).forEach(doc => {
        if (doc.generic_name) {
            bfWrites.push(
                {
                    updateOne:
                        {
                            "filter": {externalId: doc._id},
                            "update": {_id: createObjectId(), externalId: doc._id, name: doc.generic_name},
                            "upsert": true
                        }
                }
            )
            i++
            if (bfWrites.length === 1000) {
                trunks.bulkWrite(bfWrites, {ordered: false})
                bfWrites = []
                debug(i)
            }
        }
    })
}