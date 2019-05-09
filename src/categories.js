import ENV from "./env"
import http from "request-promise-native"
import {createObjectId} from 'mongo-registry'
import {getRandomColor} from "./color"


const debug = require('debug')('api:off-import')

export const getOffCat = (offUserId) =>
    ENV.DB.cats.findOne({oid: offUserId, name: "Open Food Fact", pid: null})
        .then(offCat => {
            if (!offCat) {
                offCat = {_id: createObjectId(), oid: offUserId, pid: null, name: "Open Food Fact", color: "#c99622"}
                ENV.DB.cats.insertOne(offCat)
            }
            return offCat._id
        })

export const getOffCategories = () => http.get("https://world.openfoodfacts.org/data/taxonomies/categories.json", {json: true})

const catsIdCache = {}
const getCatId = async externId => {
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

export const importCategories = async (c0) => {
    debug("download off categories...")
    const cats = (await getOffCategories())
    debug("transform off categories...")
    const writes = []
    for (let k in cats) {
        const doc = await bfCatEntry(c0, k, cats[k])
        writes.push({
            updateOne: {
                filter: {_id: doc._id},
                update: {$set: doc},
                upsert: true
            }
        })
    }
    debug("write bf categories..")
    return ENV.DB.cats.bulkWrite(writes, {ordered: false})
}

const bfCatEntry = async (c0, externId, offCat) => {
    const bfCat = {
        externId,
        _id: await getCatId(externId),
        name: offCat.name.fr || offCat.name.en || offCat.name.it || offCat.name.es || offCat.name.de || offCat.name.nl || offCat.name.ru,
        color: getRandomColor(),
        dateUpdate: new Date()
    }
    if (offCat.parents) {
        bfCat.pids = []
        for (let i = 0; i < offCat.parents.length; i++) {
            bfCat.pids.push(await getCatId(offCat.parents[i]))
        }
    } else {
        bfCat.pids = [c0]
    }
    if (offCat.wikidata) {
        bfCat.wikidata = offCat.wikidata.fr || offCat.wikidata.en
    }
    //_id, externId, wikidata, pids[], name
    //abandonné: instanceof (AOP, IGP), region (fr:'Bourgogne'), country: { en: 'Italy' }, pnns_group_2: { en: 'nuts' }
    return bfCat
}

export const toCats = (c0, off) => {
    const cats = off.categories_tags && off.categories_tags.map(externId => catsIdCache[externId]) || []
    cats.unshift(c0)
    return cats
}