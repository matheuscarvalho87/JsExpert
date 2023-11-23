export default class ContextStrategy {
  constructor(dbstrategy) {
    this.dbstrategy = dbstrategy
  }

  async connect() {
    return this.dbstrategy.connect()
  }

  async create(item) {
    return this.dbstrategy.create(item)
  }

  async read(item) {
    return this.dbstrategy.read(item)
  }
}