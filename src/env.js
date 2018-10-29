const debug = require('debug')('api:off-import')
import {version, name} from './../package.json'

const ENV = {
    NAME: name,

    DB_HOST_OFF: process.env.DB_HOST_OFF || "localhost",
    DB_NAME_OFF: process.env.DB_NAME_OFF || "off",
    DB_PORT_OFF: process.env.DB_PORT || 27017,
    DB_USER_OFF: process.env.DB_USER || "doudou",
    DB_PWD_OFF: process.env.DB_PWD || "masta",

    DB_HOST: process.env.DB_HOST || "localhost",
    DB_NAME: process.env.DB_NAME || "BlueForestTreesDB",
    DB_PORT: process.env.DB_PORT || 27017,
    DB_USER: process.env.DB_USER || "god",
    DB_PWD: process.env.DB_PWD || "tirlititi",

    NODE_ENV: process.env.NODE_ENV || null,
    VERSION: version,
}

ENV.USER_BASE_URL = {
    "production": process.env.USER_BASE_URL || "http://user:80",
    "test": "http://localhost:9999",
    "development": "http://localhost:8084"
}[ENV.NODE_ENV]

debug(JSON.stringify(ENV))

export default ENV