import FluentSQLBuilder from "@matheuscarvalho87/fluentsql"


import database from './database/data.json'  assert { type: "json" };

const result = FluentSQLBuilder.for(database)
  .where({ registered: /^(2020|2019)/ })
  .select(['name'])
  .limit(3)
  .countBy('name')
  .build()

console.log({ result })