import {getImpactId} from "./api"

const debug = require('debug')('api:off-import')

export const toImpacts = (quantity, trunkId, impactId, off) => {
    const impacts = []
    // off.environment_impact_level_tags && off.environment_impact_level_tags.length && debug("IMPACT off id %o => %o, %o", off.id, quantity, off.environment_impact_level_tags)
    // off.environment_impact_level && debug(off.environment_impact_level)
    //impacts.push({_id: getImpactId(), trunkId, impactId, bqt})
    return impacts
}