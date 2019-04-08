import {offImport} from "./off-import"
import {createSender, initRabbit} from "simple-rbmq"

const debug = require('debug')('api:off-import')

import mongodb from 'mongodb'
import ENV from './env'

const authOff = ENV => (ENV.DB_USER_OFF && ENV.DB_PWD_OFF) ? (ENV.DB_USER_OFF + ":" + ENV.DB_PWD_OFF + "@") : ""
const auth = ENV => (ENV.DB_USER && ENV.DB_PWD) ? (ENV.DB_USER + ":" + ENV.DB_PWD + "@") : ""

const multiSend = send => msgs => msgs.forEach(msg => send(msg))

export default initRabbit(ENV.RB)
    .then(async () => Promise
        .all([

            Promise.resolve(ENV.DB_CONNECTION_STRING_OFF || `mongodb://${authOff(ENV)}${ENV.DB_HOST_OFF}:${ENV.DB_PORT_OFF}/${ENV.DB_NAME_OFF}`)
                .then(connChain => console.log(`OFF: ${connChain}`) || connChain)
                .then(connChain => mongodb.MongoClient.connect(connChain, {useNewUrlParser: true})
                    .then(client => client.db(ENV.DB_NAME_OFF)))
                .catch(e => console.error("connexion OFF", e)),

            Promise.resolve(ENV.DB_CONNECTION_STRING || `mongodb://${auth(ENV)}${ENV.DB_HOST}:${ENV.DB_PORT}/${ENV.DB_NAME}?authSource=admin`)
                .then(connChain => console.log(`BF: ${connChain}`) || connChain)
                .then(connChain => mongodb.MongoClient.connect(connChain, {useNewUrlParser: true})
                    .then(client => client.db(ENV.DB_NAME)))
                .catch(e => console.error("connexion BF", e)),

            Promise.resolve(multiSend(await createSender(ENV.RB.exchange, ENV.RK_TRUNK_UPSERT))),
            Promise.resolve(multiSend(await createSender(ENV.RB.exchange, ENV.RK_FACET_UPSERT)))
        ])
        .then(offImport)
        .catch(console.error)
    )