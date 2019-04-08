import {toName} from "./name"
import {toPhoto} from "./photo"

export const toTrunk = (_id, off, quantity, oid, c0) => ({
    _id,
    externId: off._id,
    origin: "off",
    quantity,
    oid,
    name: toName(off),
    date: new Date(1000 * off.last_modified_t),
    stores: off.stores,
    categories: off.categories && off.categories.split(", "),
    photo: toPhoto(off),
    cat: {c0}
})