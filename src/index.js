import {offImport} from "./off-import"

const debug = require('debug')('api:off-import')

import mongodb from 'mongodb'
import ENV from './env'

const authOff = ENV => (ENV.DB_USER_OFF && ENV.DB_PWD_OFF) ? (ENV.DB_USER_OFF + ":" + ENV.DB_PWD_OFF + "@") : ""
const auth = ENV => (ENV.DB_USER && ENV.DB_PWD) ? (ENV.DB_USER + ":" + ENV.DB_PWD + "@") : ""

Promise
    .all([
        Promise.resolve(`mongodb://${authOff(ENV)}${ENV.DB_HOST_OFF}:${ENV.DB_PORT_OFF}/${ENV.DB_NAME_OFF}`)
            .then(connChain => console.log(`OFF: ${connChain}`) || connChain)
            .then(connChain => mongodb.MongoClient.connect(connChain, {useNewUrlParser: true})
            .then(client => client.db(ENV.DB_NAME_OFF)))
            .catch(e => console.error("connexion OFF", e)),

        Promise.resolve(ENV.DB_CONNECTION_STRING || `mongodb://${auth(ENV)}${ENV.DB_HOST}:${ENV.DB_PORT}/${ENV.DB_NAME}?authSource=admin`)
            .then(connChain => console.log(`BF: ${connChain}`) || connChain)
            .then(connChain => mongodb.MongoClient.connect(connChain, {useNewUrlParser: true})
            .then(client => client.db(ENV.DB_NAME)))
            .catch(e => console.error("connexion BF", e))
    ])
    .then(offImport)
    .catch(console.error)