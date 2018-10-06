import {toName} from "./name"
import {toPhoto} from "./photo"

export const toTrunk = (_id, off, quantity) => ({
    updateOne: {
        filter: {externId: off._id},
        update: {
            $set: {
                externId: off._id,
                quantity,
                name: toName(off),
                lastModified: new Date(1000 * off.last_modified_t),
                stores: off.stores,
                countries_tags: off.countries_tags,
                categories_tags: off.categories_tags,
                categories_hierarchy: off.categories_hierarchy,
                photo: toPhoto(off)
            },
            $setOnInsert: {
                _id
            }
        },
        upsert: true
    }
})