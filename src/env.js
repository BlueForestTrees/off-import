const debug = require('debug')('api:off-import')
import {version, name} from './../package.json'
import fs from 'fs'

const ENV = {
    NAME: name,

    PRODUCT_PATH: process.env.PRODUCT_PATH || "C:\\Users\\slim\\Downloads\\openfoodfacts-mongodbdump.tar\\openfoodfacts-mongodbdump\\dump\\off\\products.bson",
    NO_CAT: (process.env.NO_CAT && Boolean(process.env.NO_CAT)) || false,

    DB: {},

    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_NAME: process.env.DB_NAME || "BlueForestTreesDB",
    DB_PORT: process.env.DB_PORT || 27017,
    DB_USER: process.env.DB_USER || "",
    DB_PWD: process.env.DB_PWD || "",

    NODE_ENV: process.env.NODE_ENV || null,
    VERSION: version,

    RK_TRUNK_UPSERT: process.env.RK_TRUNK_UPSERT || "trunk-upsert",
    RK_FACET_UPSERT: process.env.RK_FACET_UPSERT || "facet-upsert",
    RK_IMPACT_TANK_UPSERT: process.env.RK_IMPACT_TANK_UPSERT || "impactTank-upsert",
    RB_PATH: process.env.RB_PATH || "/mq.json",

    LOG_EVERY: process.env.LOG_EVERY && parseInt(process.env.LOG_EVERY) || 5000,
}

ENV.RB = JSON.parse(fs.readFileSync(ENV.RB_PATH, 'utf8'))

ENV.USER_BASE_URL = {
    "production": process.env.USER_BASE_URL || "http://user:80",
    "test": "http://localhost:9999",
    "development": "http://localhost:8084"
}[ENV.NODE_ENV]

debug(JSON.stringify(ENV))

export default ENV