import {cols} from "./collections"
import {toBqt} from "./quantity"
import {createObjectId} from "mongo-registry"
import {toTrunk} from "./trunk"
import {toFacet} from "./facet"
import {getOffCat, getOffUserId, getTrunkId} from "./api"
import {importEntries} from "./entries"
import ENV from './env'
import {importCategories} from "./categories"

const debug = require('debug')('api:off-import')

export const offImport = async ([offDb, bfDb, trunkSend, facetSend]) => {
    debug("connected. start import init..")

    const oid = await getOffUserId()
    const cats = bfDb.collection(cols.CATEGORIES)
    const c0 = await getOffCat(cats, oid)
    await importCategories(c0, cats)

    const filter = JSON.parse(ENV.IMPORT_FILTER)
    await importEntries(await bfDb.collection(cols.FACET_ENTRY))

    const offCol = offDb.collection(cols.OFF)
    const trunks = bfDb.collection(cols.TRUNK)
    const facetEntries = (await bfDb.collection(cols.FACET_ENTRY).find({}).toArray()).reduce((res, fe) => (res[fe.externId] = fe) && res, {})
    let entryKeys = Object.keys(facetEntries)

    const offFields = {lc: 1, images: 1, code: 1, stores: 1, countries_tags: 1, last_modified_t: 1, quantity: 1, categories_hierarchy: 1, nutriments: 1, product_name: 1, generic_name: 1}

    let offCount = 0
    let trunkCount = 0
    let trunkWithFacetCount = 0
    let writenFacets = 0
    let trunkBuffer = []
    let facetBuffer = []
    let facetsCount = 0
    let bufferSize = 2000

    debug("inited. find docs...")

    const cursor = offCol.find(filter, offFields)

    while (await cursor.hasNext()) {
        const off = await cursor.next()
        offCount++
        if (offCount % bufferSize === 0) {
            debug("counts: off=%o trunk=%o trunkWFacets=%o facetStored=%o", offCount, trunkCount, trunkWithFacetCount, writenFacets)
        }
        if (off.quantity != null && off._id.length === 13) {
            const quantity = toBqt(off.quantity)
            if (quantity) {
                trunkCount++
                const _id = await getTrunkId(trunks, off)

                facetsCount = facetBuffer.length
                toFacet(quantity, _id, off, facetEntries, entryKeys, facetBuffer)
                //toImpact environment_impact_level_tags
                facetsCount = facetBuffer.length - facetsCount
                if (facetsCount > 0) {
                    trunkWithFacetCount++
                    if (facetBuffer.length >= bufferSize) {
                        writenFacets += facetBuffer.length
                        facetSend(facetBuffer)
                        facetBuffer = []
                    }

                    let trunk = toTrunk(_id, off, quantity, oid, c0)
                    trunkBuffer.push(trunk)
                    if (trunkBuffer.length === bufferSize) {
                        trunkSend(trunkBuffer)
                        trunkBuffer = []
                    }
                }

            }
        }
    }

    debug("FINAL write %o facetsCount", facetBuffer.length)
    if (facetBuffer.length > 0) {
        writenFacets += facetBuffer.length
        facetSend(facetBuffer)
    }

    debug("FINAL write %o trunks", trunkBuffer.length)
    if (trunkBuffer.length > 0) {
        trunkSend(trunkBuffer)
    }
    debug("FINAL counts: offs=%o trunks=%o trunkWFacets=%o writenFacets=%o", offCount, trunkCount, trunkWithFacetCount, writenFacets)
}


