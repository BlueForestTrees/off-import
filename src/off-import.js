import {cols} from "./collections"
import {toBqt} from "./quantity"
import {toName} from "./name"
import {toPhoto} from "./photo"
import {createObjectId} from "mongo-registry"

const debug = require('debug')('api:off-import')

export const offImport = async ([offDb, bfDb]) => {
    let offCol = offDb.collection(cols.OFF)
    let trunks = bfDb.collection(cols.TRUNK)
    let facetEntries = (await bfDb.collection(cols.FACET_ENTRY).find({}).toArray())

    const offFields = {lc: 1, images: 1, code: 1, stores: 1, countries_tags: 1, last_modified_t: 1, quantity: 1, categories_hierarchy: 1, nutriments: 1, product_name: 1, generic_name: 1}

    let raw = 0
    let fil = 0
    let bfs = []
    let fcs = []

    offCol.find({}, offFields).forEach(async off => {
        raw++
        if (raw % 2000 === 0) {
            debug(raw, fil)
        }
        if (off.quantity != null && off._id.length === 13) {
            const quantity = toBqt(off.quantity)
            if (quantity) {
                fil++
                const _id = createObjectId()

                bfs.push({
                    updateOne: {
                        filter: {externId: off._id},
                        update: {
                            $set: {
                                externId: off._id,
                                quantity: quantity,
                                name: toName(off),
                                lastModified: new Date(1000 * off.last_modified_t),
                                stores: off.stores,
                                countries_tags: off.countries_tags,
                                categories_tags: off.categories_tags,
                                categories_hierarchy: off.categories_hierarchy,
                                photo: toPhoto(off)
                            },
                            $setOnInsert: {
                                _id
                            }
                        },
                        upsert: true
                    }
                })
                if (bfs.length === 1000) {
                    await trunks.bulkWrite(bfs, {ordered: false})
                    bfs = []
                }


            }
        }
    })
}
