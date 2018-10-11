import client from "request-promise-native"
import env from "./env"
import {object, createObjectId} from "mongo-registry"

const debug = require('debug')('api:import')

const get = (path, opts) => {
    const url = `${env.USER_BASE_URL}${path}`
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

export const getOffCat = (col, offUserId) =>
    col.findOne({oid: offUserId, name: "Open Food Fact", pid: null})
        .then(offCat => {
            if (!offCat) {
                offCat = {_id: createObjectId(), oid: offUserId, pid: null, name: "Open Food Fact", color: "#c99622"}
                col.insertOne(offCat)
            }
            return offCat._id
        })