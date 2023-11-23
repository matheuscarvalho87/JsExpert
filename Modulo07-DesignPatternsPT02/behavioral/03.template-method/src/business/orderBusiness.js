import BaseBusiness from "./base/baseBusiness.js";

export default class OrderBusiness extends BaseBusiness {
  #order = new Set()
  _validateRequiredField(data) {
    return !!data.amount && !!data.products.length
  }

  _create(data) {
    this.#order.add(data)
    return true
  }
}