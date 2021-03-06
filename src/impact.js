import ENV from "./env"
import {createObjectId} from 'mongo-registry'

export const toImpacts = async (quantity, trunkId, impactId, off) => {
    const impacts = []
    const co2 = off.nutriments && off.nutriments["carbon-footprint-from-meat-or-fish_product"]
    if (co2) {
        const bqt = co2 / quantity.bqt / 1000
        const _id = await getImpactId(trunkId, impactId)
        const dateUpdate = new Date()
        impacts.push({_id, trunkId, impactId, bqt, dateUpdate})
    }
    return impacts
}

export const getImpactId = async (trunkId, impactId) => {
    const impact = await ENV.DB.impactTank.findOne({trunkId, impactId}, {projection: {_id: 1}})
    return impact ? impact._id : createObjectId()
}

export const getImpactCO2Entry = () => ENV.DB.impactEntry.findOne({name: "Changement climatique"})