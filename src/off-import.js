import {cols} from "./collections"
import {toBqt} from "./quantity"
import {createObjectId} from "mongo-registry"
import {toTrunk} from "./trunk"
import {toFacet} from "./facet"

const debug = require('debug')('api:off-import')

const getTrunkId = async (trunks, off) => {
    const trunk = await trunks.findOne({externId: off._id}, {projection: {_id: 1}})
    return trunk ? trunk._id : createObjectId()
}

export const offImport = async ([offDb, bfDb]) => {
    let offCol = offDb.collection(cols.OFF)
    let trunks = bfDb.collection(cols.TRUNK)
    let facets = bfDb.collection(cols.FACET)
    let facetEntries = (await bfDb.collection(cols.FACET_ENTRY).find({}).toArray()).reduce((res, fe) => (res[fe.externId] = fe) && res, {})
    let entryKeys = Object.keys(facetEntries)

    const offFields = {lc: 1, images: 1, code: 1, stores: 1, countries_tags: 1, last_modified_t: 1, quantity: 1, categories_hierarchy: 1, nutriments: 1, product_name: 1, generic_name: 1}

    let offCount = 0
    let trunkCount = 0
    let trunkWithFacetCount = 0
    let facetCount = 0
    let trunkBuffer = []
    let facetBuffer = []
    let trunkFacets = 0

    offCol.find({}, offFields).limit(200)
        .forEach(async off => {
            debug(offCount)
            offCount++
            if (offCount % 2000 === 0) {
                debug("counts: off=%o trunk=%o trunkWFacets=%o facetStored=%o", offCount, trunkCount, trunkWithFacetCount, facetCount)
            }
            if (off.quantity != null && off._id.length === 13) {
                const quantity = toBqt(off.quantity)
                if (quantity) {
                    trunkCount++
                    const _id = await getTrunkId(trunks, off)

                    trunkFacets = facetBuffer.length
                    toFacet(quantity, _id, off, facetEntries, entryKeys, facetBuffer)
                    trunkFacets = facetBuffer.length - trunkFacets
                    if (trunkFacets > 0) {
                        trunkWithFacetCount++
                        //debug("off._id=%o trunkFacets=%o bufferSize=%o", off._id, trunkFacets, facetBuffer.length)
                        if (facetBuffer.length >= 1000) {
                            //debug("write %o facets", facetBuffer.length)
                            facetCount += facetBuffer.length
                            //await facets.bulkWrite(facetBuffer, {ordered: false})
                            facetBuffer = []
                        }

                        trunkBuffer.push(toTrunk(_id, off, quantity))
                        if (trunkBuffer.length === 1000) {
                            await trunks.bulkWrite(trunkBuffer, {ordered: false})
                            trunkBuffer = []
                        }
                    }

                }
            }
        })
        .then(async () => {
            debug("FINAL write %o facets", facetBuffer.length)
            if (facetBuffer.length > 0) {
                facetCount += facetBuffer.length
                //await facets.bulkWrite(facetBuffer, {ordered: false})
                facetBuffer = []
            }

            if (trunkBuffer.length > 0) {
                await trunks.bulkWrite(trunkBuffer, {ordered: false})
                trunkBuffer = []
            }
            debug("FINAL counts: off=%o trunk=%o trunkWFacets=%o facetStored=%o", offCount, trunkCount, trunkWithFacetCount, facetCount)
        })
}
