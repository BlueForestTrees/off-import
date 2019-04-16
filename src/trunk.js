import {toName} from "./name"
import {toPhoto} from "./photo"
import {toCats} from "./categories"
import ENV from "./env"
import {createObjectId} from 'mongo-registry'

export const toTrunk = (_id, off, quantity, oid, c0)
    _id,
    externId: off._id,
    origin: "off",
    quantity,
    oid,
    name: toName(off),
    date: new Date(1000 * off.last_modified_t),
    stores: off.stores,
    photo: toPhoto(off),
    cats: toCats(c0, off)
})

export const getTrunkId = async off => {
    const trunk = await ENV.DB.trunks.findOne({externId: off._id}, {projection: {_id: 1}})
    return trunk && trunk._id || createObjectId()
}