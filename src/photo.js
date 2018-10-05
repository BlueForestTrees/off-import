const addRev = (sb, doc, key, code) => {
    if (doc[key]) {
        const rev = doc[key].rev
        if (rev != null) {
            sb.push(key, ".", rev, ".[size].jpg")
            return true
        } else {
            //System.out.println("no rev " + key + " in " + code);
            return false
        }
    } else {
        return false
    }
}

export const toPhoto = off => {
    const images = off.images
    if (!images) {
        return null
    }
    const code = off._id
    const sb = ["https://static.openfoodfacts.org/images/products/", code.substring(0, 3), "/", code.substring(3, 6), "/", code.substring(6, 9), "/", code.substring(9, 13), "/"]

    if (!addRev(sb, images, "front_" + off.lc, code)) {
        if (!addRev(sb, images, "front_fr", code)) {
            if (!addRev(sb, images, "front", code)) {
                if (!addRev(sb, images, "ingredients_fr", code)) {
                    if (!addRev(sb, images, "front_en", code)) {
                        if (!addRev(sb, images, "front_de", code)) {
                            if (!addRev(sb, images, "front_is", code)) {
                                if (!addRev(sb, images, "front_ru", code)) {
                                    if (!addRev(sb, images, "front_pt", code)) {
                                        //System.out.println(lc + " " + code + " "  + images.keySet());
                                        return null
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }


    const url = sb.join('')
    //System.out.println(code + " => " + url);
    return url
}