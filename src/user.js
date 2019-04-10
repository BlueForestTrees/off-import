import ENV from "./env"
import http from "request-promise-native"
import {object} from "mongo-registry"

export const getOffUserId = async () => {
    const ademeUser = await http.get(`${ENV.USER_BASE_URL}/api/user/mail/fr.openfoodfacts.org`, {json:true, headers: {mixin: "_id"}})
    if (!ademeUser._id) {
        throw {code: "bf500"}
    } else {
        return object(ademeUser._id)
    }
}