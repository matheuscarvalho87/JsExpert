import { database } from '../shared/data.mjs'

class Aplication {
  constructor(factory) {
    this.table = factory.createTable()
  }

  initialize(database) {
    this.table.render(database)
  }
}
; (async function main() {
  const path = globalThis.window ? 'browser' : 'console'
  const { default: viewFactory } = await import(`./../platforms/${path}/index.mjs`)
  const app = new Aplication(new viewFactory())
  app.initialize(database)
})()