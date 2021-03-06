import {toBqt} from "./quantity"
import {getTrunkId, toTrunk} from "./trunk"
import {toFacets} from "./facet"
import importFacetEntries from "./facetEntries"
import ENV from './env'
import {getOffCat, importCategories} from "./categories"
import {getImpactCO2Entry, toImpacts} from "./impact"
import {getOffUserId} from "./user"

const debug = require('debug')('api:off-import')

export const offImport = async ({offStream, sendTrunk, sendFacet, sendImpactTank}) => {
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

    if (ENV.NO_CAT === true) {
        debug("no categories catalog import since NO_CAT === true")
    } else {
        debug("categories...")
        await importCategories(c0)
    }

    let offCount = 0
    let trunkCount = 0
    let facetCount = 0
    let impactCount = 0
    let noQtCount = 0
    let qtNoMatch = 0
    let noIdCount = 0
    let noFacetImpact = 0

    const readOffdoc = async offTrunk => {
        if (offCount % ENV.LOG_EVERY === 0) {
            debug("%o lines, %o trunks, %o no qt, %o qtNoMatch, %o no _id, %o noFacetImpact; %o facets, %o impacts", offCount, trunkCount, noQtCount, qtNoMatch, noIdCount, noFacetImpact, facetCount, impactCount)
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
                        await sendTrunk(trunk)
                        await sendFacet(facets)
                        await sendImpactTank(impacts)
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

    const read = () => offStream.read()
    let end = new Promise((accept, reject) => {
        offStream.on('data', doc => {
            if (doc) {
                readOffdoc(doc).then(read).catch(console.error)
            } else {
                debug("FINAL %o lines, %o trunks, %o no qt, %o qtNoMatch, %o no _id, %o noFacetImpact; %o facets, %o impacts", offCount, trunkCount, noQtCount, qtNoMatch, noIdCount, noFacetImpact, facetCount, impactCount)
                accept()
            }
        })
        offStream.on('error', reject)
    })

    offStream.read()

    await end
}