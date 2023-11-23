import ContextStrategy from "./src/base/contextStrategy.js"
import MongoDBStrategy from './src/strategies/mongoDBStrategy.js'
import PostgresStrategy from './src/strategies/postgresStrategy.js'

const postgresConnectionString = "postgres://matheuscarvalho:senha0001@localhost:5432/heroes"
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString))
await postgresContext.connect()

const mongoDBConnectionString = "mongodb://matheuscarvalho:senha0001@localhost:27017/heroes"
const mongodbContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString))
await mongodbContext.connect()

const data = [{
  name: 'matheuscarvalho',
  type: 'transaction'
}, {
  name: 'marcosantos',
  type: 'activityLog'
},]
const contextTypes = {
  transaction: postgresContext,
  activityLog: mongodbContext
}

for (const { name, type } of data) {
  const context = contextTypes[type]
  await context.create({ name: name + Date.now() })
  console.log(type, context.dbstrategy.constructor.name)
  console.log(await context.read())
}