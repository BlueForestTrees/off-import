export const toName = off =>
    off.generic_name == null ?
        off.product_name == null ?
            null
            :
            off.product_name
        :
        off.product_name == null ?
            off.generic_name
            :
            off.product_name.length > off.generic_name.length ? off.product_name : off.generic_name