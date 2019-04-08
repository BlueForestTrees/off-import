import {getCatId, getOffCategories} from "./api"

const debug = require('debug')('api:off-import')

export const importCategories = async (c0, dbCats) => {
    debug("downloading off categories...")
    const cats = (await getOffCategories())
    debug("downloading off categories OK")
    for (let k in cats) {
        const doc = await bfCat(c0, k, cats[k], dbCats)
        dbCats.updateOne({_id: doc._id}, {$set: doc}, {upsert: true})
    }
}

const bfCat = async (c0, externId, offCat, dbCats) => {
    const bfCat = {
        externId,
        _id: await getCatId(dbCats, externId),
        name: offCat.name.fr || offCat.name.en || offCat.name.it || offCat.name.es || offCat.name.de || offCat.name.nl || offCat.name.ru,
    }
    if (offCat.parents) {
        bfCat.pids = []
        for (let i = 0; i < offCat.parents.length; i++) {
            bfCat.pids.push(await getCatId(dbCats, offCat.parents[i]))
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