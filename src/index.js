import {offImport} from "./off-import"

const debug = require('debug')('api:off-import')

import mongodb from 'mongodb'
import ENV from './env'

const auth = ENV => (ENV.DB_USER && ENV.DB_PWD) ? (ENV.DB_USER + ":" + ENV.DB_PWD + "@") : ""

Promise
    .all([
        mongodb.MongoClient.connect(`mongodb://localhost:27017/${ENV.DB_NAME_OFF}`, {useNewUrlParser: true}).then(client => client.db(ENV.DB_NAME_OFF)),
        mongodb.MongoClient.connect(`mongodb://${auth(ENV)}${ENV.DB_HOST}:${ENV.DB_PORT}/${ENV.DB_NAME}?authSource=admin`, {useNewUrlParser: true}).then(client => client.db(ENV.DB_NAME))
    ])
    .then(offImport)