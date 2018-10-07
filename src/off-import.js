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
    let writenFacets = 0
    let trunkBuffer = []
    let facetBuffer = []
    let trunkFacets = 0
    let bufferSize = 100

    //aidx => par paquet de 1000, puis bulkWrite les deux
    offCol.find({}, offFields).limit(250)
        .forEach(async off => {
            offCount++
            if (offCount % bufferSize === 0) {
                debug("counts: off=%o trunk=%o trunkWFacets=%o facetStored=%o", offCount, trunkCount, trunkWithFacetCount, writenFacets)
            }
            if (off.quantity != null && off._id.length === 13) {
                const quantity = toBqt(off.quantity)
                if (quantity) {
                    trunkCount++
                    const _id = await getTrunkId(trunks, off)

                    trunkFacets = facetBuffer.length
                    toFacet(quantity, _id, off, facetEntries, entryKeys, facetBuffer)
                    trunkFacets = facetBuffer.length - trunkFacets
                    debug(trunkFacets)
                    if (trunkFacets > 0) {
                        trunkWithFacetCount++
                        //debug("off._id=%o trunkFacets=%o bufferSize=%o", off._id, trunkFacets, facetBuffer.length)
                        if (facetBuffer.length >= bufferSize) {
                            //debug("write %o facets", facetBuffer.length)
                            writenFacets += facetBuffer.length
                            //await facets.bulkWrite(facetBuffer, {ordered: false})
                            facetBuffer = []
                        }

                        trunkBuffer.push(toTrunk(_id, off, quantity))
                        if (trunkBuffer.length === bufferSize) {
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
                writenFacets += facetBuffer.length
                //await facets.bulkWrite(facetBuffer, {ordered: false})
                facetBuffer = []
            }

            debug("FINAL write %o trunks", trunkBuffer.length)
            if (trunkBuffer.length > 0) {
                await trunks.bulkWrite(trunkBuffer, {ordered: false})
                trunkBuffer = []
            }
            debug("FINAL counts: offs=%o trunks=%o trunkWFacets=%o writenFacets=%o", offCount, trunkCount, trunkWithFacetCount, writenFacets)
        })
}
