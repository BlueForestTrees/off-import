import {offImport} from "./off-import"
import {createSender, initRabbit} from "simple-rbmq"
import mongodb from 'mongodb'
import ENV from './env'
import {cols} from "./collections"
import fs from 'fs'
import BSONStream from 'bson-stream'

const debug = require('debug')('api:off-import')

const auth = ENV => (ENV.DB_USER && ENV.DB_PWD) ? (ENV.DB_USER + ":" + ENV.DB_PWD + "@") : ""

const multiSend = send => msgs => Promise.all(msgs.map(async msg => await send(msg)))

export default initRabbit(ENV.RB)
    .then(async () => Promise
        .all([

            fs.createReadStream(ENV.PRODUCT_PATH).pipe(new BSONStream()),

            Promise.resolve(await createSender(ENV.RB.exchange, ENV.RK_TRUNK_UPSERT)),
            Promise.resolve(multiSend(await createSender(ENV.RB.exchange, ENV.RK_FACET_UPSERT))),
            Promise.resolve(multiSend(await createSender(ENV.RB.exchange, ENV.RK_IMPACT_TANK_UPSERT))),

            Promise.resolve(ENV.DB_CONNECTION_STRING || `mongodb://${auth(ENV)}${ENV.DB_HOST}:${ENV.DB_PORT}/${ENV.DB_NAME}?authSource=admin`)
                .then(connChain => debug(`BF: ${connChain}`) || connChain)
                .then(connChain => mongodb.MongoClient.connect(connChain, {useNewUrlParser: true})
                    .then(client => {
                        const bfDb = client.db(ENV.DB_NAME)
                        ENV.DB.trunks = bfDb.collection(cols.TRUNK)
                        ENV.DB.impactTank = bfDb.collection(cols.IMPACT_TANK)
                        ENV.DB.impactEntry = bfDb.collection(cols.IMPACT_ENTRY)
                        ENV.DB.facets = bfDb.collection(cols.FACET)
                        ENV.DB.facetEntry = bfDb.collection(cols.FACET_ENTRY)
                        ENV.DB.cats = bfDb.collection(cols.CATEGORIES)
                        return bfDb
                    }))
                .catch(e => console.error("connexion BF", e)),
        ])
        .then(([offStream, sendTrunk, sendFacet, sendImpactTank])=>({offStream, sendTrunk, sendFacet, sendImpactTank}))
        .then(offImport)
        .then(() => process.exit(0))
        .catch(console.error)
    )