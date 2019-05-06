const debug = require('debug')('api:off-import')
import {version, name} from './../package.json'
import fs from 'fs'

const defined = v => v !== null && v !== undefined

const ENV = {
    NAME: name,

    IMPORT_FILTER: process.env.IMPORT_FILTER || '{}',

    DB: {},
    DB_CONNECTION_STRING_OFF: process.env.DB_CONNECTION_STRING_OFF,
    DB_HOST_OFF: process.env.DB_HOST_OFF || "localhost",
    DB_NAME_OFF: process.env.DB_NAME_OFF || "off",
    DB_PORT_OFF: process.env.DB_PORT_OFF || 27017,
    DB_USER_OFF: process.env.DB_USER_OFF || "",
    DB_PWD_OFF: process.env.DB_PWD_OFF || "",

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
    RB_PATH: process.env.RB_PATH || "mq.json",

    LOG_EVERY: process.env.LOG_EVERY && parseInt(process.env.LOG_EVERY) || 200,
    SKIP: defined(process.env.SKIP) && parseInt(process.env.SKIP) || 0,
    LIMIT: defined(process.env.LIMIT) && parseInt(process.env.LIMIT) || 100000
}

ENV.RB = JSON.parse(fs.readFileSync(ENV.RB_PATH, 'utf8'))

ENV.USER_BASE_URL = {
    "production": process.env.USER_BASE_URL || "http://user:80",
    "test": "http://localhost:9999",
    "development": "http://localhost:8084"
}[ENV.NODE_ENV]

debug(JSON.stringify(ENV))

export default ENV