import {toName} from "./name"
import {toPhoto} from "./photo"

const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

export const toTrunk = (_id, off, quantity, oid, c0) => ({
    updateOne: {
        filter: {externId: off._id},
        update: {
            $set: {
                externId: off._id,
                quantity,
                oid,
                name: toName(off),
                lastModified: new Date(1000 * off.last_modified_t),
                stores: off.stores,
                categories_tags: off.categories_tags,
                categories_hierarchy: off.categories_hierarchy,
                photo: toPhoto(off),
                color: getRandomColor(),
                cat: {c0}
            },
            $setOnInsert: {
                _id
            }
        },
        upsert: true
    }
})