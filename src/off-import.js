import {toBqt} from "./quantity"
import {toTrunk} from "./trunk"
import {toFacets} from "./facet"
import {getImpactCO2Entry, getOffCat, getOffUserId, getTrunkId} from "./api"
import {importFacetEntries} from "./entries"
import ENV from './env'
import {importCategories} from "./categories"
import {toImpacts} from "./impact"

const debug = require('debug')('api:off-import')

export const offImport = async ([offDb, bfDb, trunkSend, facetSend, impactSend]) => {
    debug("get impact CO2 entry")
    const impactCO2Entry = await getImpactCO2Entry()
    if (!impactCO2Entry) {
        throw new Error("impactCO2Entry not found")
    } else {
        debug("impact entry co2 is %o", impactCO2Entry._id)
    }
    const impactCO2Id = impactCO2Entry._id

    debug("get off user")
    const oid = await getOffUserId()

    debug("get root cat")
    const c0 = await getOffCat(oid)

    debug("facet entries...")
    await importFacetEntries()
    const facetEntries = (await ENV.DB.facetEntry.find({}).toArray()).reduce((res, fe) => (res[fe.externId] = fe) && res, {})
    let entryKeys = Object.keys(facetEntries)

    if (ENV.PAGE === 0) {
        debug("categories...")
        await importCategories(c0)
    }

    debug("off trunks...")
    const from = ENV.PAGE_SIZE * ENV.PAGE
    const count = ENV.PAGE_SIZE
    debug("skip %o limit %o...", from, count)

    const offFields = {lc: 1, images: 1, code: 1, stores: 1, countries_tags: 1, last_modified_t: 1, quantity: 1, nutriments: 1, product_name: 1, generic_name: 1}
    let bufferSize = 20000
    let offCount = 0
    let trunkCount = 0
    let facetCount = 0
    let impactCount = 0
    let noQtCount = 0
    let noIdCount = 0

    const cursor = ENV.DB.off
        .find(JSON.parse(ENV.IMPORT_FILTER), offFields)
        .skip(from).limit(count)

    while (await cursor.hasNext()) {
        const offTrunk = await cursor.next()
        offCount++
        if (offCount % bufferSize === 0) {
            debug("offs=%o trunks=%o (%o/%O) facetCount=%o impactCount=%o", offCount, trunkCount, noQtCount, noIdCount, facetCount, impactCount)
        }
        if (offTrunk.quantity != null) {
            if (offTrunk._id.length === 13) {
                const quantity = toBqt(offTrunk.quantity)
                if (quantity) {
                    const trunkId = await getTrunkId(offTrunk)

                    const trunk = toTrunk(trunkId, offTrunk, quantity, oid, c0)
                    const facets = toFacets(quantity, trunkId, offTrunk, facetEntries, entryKeys)
                    const impacts = toImpacts(quantity, trunkId, impactCO2Id, offTrunk)

                    if (facets.length || impacts.length) {
                        trunkCount++
                        facetCount += facets.length
                        impactCount += impacts.length
                        trunkSend(trunk)
                        facetSend(facets)
                        impactSend(impacts)
                    }
                }
            } else {
                noIdCount++
            }
        } else {
            noQtCount++
        }
    }
    debug("FINAL counts: offs=%o trunks=%o (%o/%O) facetCount=%o impactCount=%o", offCount, trunkCount, noQtCount, noIdCount, facetCount, impactCount)
}


