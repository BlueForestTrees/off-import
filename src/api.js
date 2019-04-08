import client from "request-promise-native"
import ENV from "./env"
import {object, createObjectId} from "mongo-registry"

const debug = require('debug')('api:import')

const get = (path, opts) => {
    const url = `${ENV.USER_BASE_URL}${path}`
    debug("GET %o", url)
    return client.get(url, {json: true, ...opts})
}
export const getOffUserId = async () => {
    const ademeUser = await get(`/api/user/mail/fr.openfoodfacts.org`, {headers: {mixin: "_id"}})
    if (!ademeUser._id) {
        throw {code: "bf500"}
    } else {
        return object(ademeUser._id)
    }
}

export const getOffCat = (offUserId) =>
    ENV.DB.cats.findOne({oid: offUserId, name: "Open Food Fact", pid: null})
        .then(offCat => {
            if (!offCat) {
                offCat = {_id: createObjectId(), oid: offUserId, pid: null, name: "Open Food Fact", color: "#c99622"}
                ENV.DB.cats.insertOne(offCat)
            }
            return offCat._id
        })

export const getOffCategories = () => client.get("https://world.openfoodfacts.org/data/taxonomies/categories.json", {json: true})

export const getTrunkId = async off => {
    const trunk = await ENV.DB.trunks.findOne({externId: off._id}, {projection: {_id: 1}})
    return trunk ? trunk._id : createObjectId()
}

export const getFacetId = async (trunkId, facetId) => {
    const facet = await ENV.DB.facets.findOne({trunkId, facetId}, {projection: {_id: 1}})
    return facet ? facet._id : createObjectId()
}

export const getImpactId = async (impacts, trunkId, impactId) => {
    const impact = await impacts.findOne({trunkId, impactId}, {projection: {_id: 1}})
    return impact ? impact._id : createObjectId()
}

const catsIdCache = {}
export const getCatId = async externId => {
    if (catsIdCache[externId]) {
        return catsIdCache[externId]
    } else {
        const cat = await ENV.DB.cats.findOne({externId}, {projection: {_id: 1}})
        if (cat) {
            catsIdCache[externId] = cat._id
        } else {
            catsIdCache[externId] = createObjectId()
        }
    }
    return catsIdCache[externId]
}

export const getImpactCO2Entry = () => ENV.DB.impactEntry.findOne({name: "Changement climatique"})

const catsByNameCache = {}
export const getCatByName = async name => {
    if (catsByNameCache[name]) {
        return catsByNameCache[name]
    } else {
        const cat = await ENV.DB.cats.findOne({name}, {projection: {_id: 1}})
        catsByNameCache[name] = cat._id
        return cat._id
    }
}