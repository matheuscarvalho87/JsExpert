import { NotImplementedExpection } from "../../util/exceptions.js";


export default class BaseBusiness {
  _validateRequiredField(data) {
    throw new NotImplementedExpection(
      this._validateRequiredField.name
    )
  }
  _create(data) {
    throw new NotImplementedExpection(
      this._validateRequiredField.name
    )
  }
  /*
  Padrao do martin Fowler
  a proposta do padrão é garantir um fluxo de métodos, definindo uma sequencia a ser executada

  esse create é a implementação efetiva do Template Method
  */
  create(data) {
    // validar campos
    const isValid = this._validateRequiredField(data)
    if (!isValid) throw new Error(`invalida data!`)

    return this._create
    //salvar no banco
  }
}