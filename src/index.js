import {offImport} from "./off-import"
import {createSender, initRabbit} from "simple-rbmq"

const debug = require('debug')('api:off-import')

import mongodb from 'mongodb'
import ENV from './env'
import {cols} from "./collections"

const authOff = ENV => (ENV.DB_USER_OFF && ENV.DB_PWD_OFF) ? (ENV.DB_USER_OFF + ":" + ENV.DB_PWD_OFF + "@") : ""
const auth = ENV => (ENV.DB_USER && ENV.DB_PWD) ? (ENV.DB_USER + ":" + ENV.DB_PWD + "@") : ""

const multiSend = send => msgs => msgs.forEach(msg => send(msg))

export default initRabbit(ENV.RB)
    .then(async () => Promise
        .all([

            Promise.resolve(ENV.DB_CONNECTION_STRING_OFF || `mongodb://${authOff(ENV)}${ENV.DB_HOST_OFF}:${ENV.DB_PORT_OFF}/${ENV.DB_NAME_OFF}`)
                .then(connChain => debug(`OFF: ${connChain}`) || connChain)
                .then(connChain => mongodb.MongoClient.connect(connChain, {useNewUrlParser: true})
                    .then(client => {
                        const offDb = client.db(ENV.DB_NAME_OFF)
                        ENV.DB.off = offDb.collection(cols.OFF)
                        return offDb
                    }))
                .catch(e => console.error("connexion OFF", e)),

            Promise.resolve(ENV.DB_CONNECTION_STRING || `mongodb://${auth(ENV)}${ENV.DB_HOST}:${ENV.DB_PORT}/${ENV.DB_NAME}?authSource=admin`)
                .then(connChain => debug(`BF: ${connChain}`) || connChain)
                .then(connChain => mongodb.MongoClient.connect(connChain, {useNewUrlParser: true})
                    .then(client => {
                        const bfDb = client.db(ENV.DB_NAME)
                        ENV.DB.trunks = bfDb.collection(cols.TRUNK)
                        ENV.DB.impacts = bfDb.collection(cols.IMPACT)
                        ENV.DB.impactEntry = bfDb.collection(cols.IMPACT_ENTRY)
                        ENV.DB.facets = bfDb.collection(cols.FACET)
                        ENV.DB.facetEntry = bfDb.collection(cols.FACET_ENTRY)
                        ENV.DB.cats = bfDb.collection(cols.CATEGORIES)
                        return bfDb
                    }))
                .catch(e => console.error("connexion BF", e)),

            Promise.resolve(await createSender(ENV.RB.exchange, ENV.RK_TRUNK_UPSERT)),
            Promise.resolve(multiSend(await createSender(ENV.RB.exchange, ENV.RK_FACET_UPSERT))),
            Promise.resolve(multiSend(await createSender(ENV.RB.exchange, ENV.RK_IMPACT_UPSERT)))
        ])
        .then(offImport)
        .catch(console.error)
    )