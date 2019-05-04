import {toBqt} from "./quantity"
import {getTrunkId, toTrunk} from "./trunk"
import {toFacets} from "./facet"
import {importFacetEntries} from "./entries"
import ENV from './env'
import {getOffCat, importCategories} from "./categories"
import {getImpactCO2Entry, toImpacts} from "./impact"
import {getOffUserId} from "./user"

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
    } else {
        debug("no categories catalog import since PAGE > 0")
    }

    debug("off trunks...")
    const from = ENV.PAGE_SIZE * ENV.PAGE
    const count = ENV.PAGE_SIZE
    debug("skip %o limit %o...", from, count)

    const offFields = {lc: 1, images: 1, code: 1, stores: 1, countries_tags: 1, last_modified_t: 1, quantity: 1, nutriments: 1, product_name: 1, generic_name: 1}
    let offCount = 0
    let trunkCount = 0
    let facetCount = 0
    let impactCount = 0
    let noQtCount = 0
    let qtNoMatch = 0
    let noIdCount = 0
    let noFacetImpact = 0

    const cursor = ENV.DB.off
        .find(JSON.parse(ENV.IMPORT_FILTER), offFields)
        .skip(from).limit(count)

    while (await cursor.hasNext()) {
        const offTrunk = await cursor.next()
        if (offCount % ENV.PAGE_LOG === 0) {
            debug("%o trunks, %o no qt, %o qtNoMatch, %o no _id, %o noFacetImpact, in %o lines. %o facets, %o impacts", trunkCount, noQtCount, qtNoMatch, noIdCount, noFacetImpact, offCount, facetCount, impactCount)
        }
        if (offTrunk.quantity != null) {
            if (offTrunk._id.length === 13) {
                const quantity = toBqt(offTrunk.quantity)
                if (quantity) {
                    const trunkId = await getTrunkId(offTrunk)

                    const trunk = toTrunk(trunkId, offTrunk, quantity, oid, c0)
                    const facets = await toFacets(quantity, trunkId, offTrunk, facetEntries, entryKeys)
                    const impacts = await toImpacts(quantity, trunkId, impactCO2Id, offTrunk)

                    if (facets.length || impacts.length) {
                        facetCount += facets.length
                        impactCount += impacts.length
                        await trunkSend(trunk)
                        await facetSend(facets)
                        await impactSend(impacts)
                        trunkCount++
                    } else {
                        noFacetImpact++
                    }
                } else {
                    qtNoMatch++
                }
            } else {
                noIdCount++
            }
        } else {
            noQtCount++
        }
        offCount++
    }
    debug("FINAL %o trunks, %o no qt, %o qtNoMatch, %o no _id, %o noFacetImpact, in %o lines. %o facets, %o impacts", trunkCount, noQtCount, qtNoMatch, noIdCount, noFacetImpact, offCount, facetCount, impactCount)
}


