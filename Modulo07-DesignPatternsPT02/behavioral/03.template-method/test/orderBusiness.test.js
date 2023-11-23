import { expect, describe, jest, beforeEach } from '@jest/globals'
import Order from '../src/entities/order.js'
import OrderBusiness from '../src/business/orderBusiness.js'

describe("Test suite for template Method design pattern", () => {

  beforeEach(() => {
    jest.restoreAllMocks()
  })

  describe("#OrderBusiness", () => {
    test('Execution Order Business without Template Method', () => {
      const order = new Order({
        customer: 1,
        amount: 100.00,
        products: [{ description: 'ferrari' }]
      })

      const orderBusiness = new OrderBusiness()
      //todos devs devem obrigatoriamente lembrar de seguir a risca esse fluxo de execução
      //se algum esqeucer de chamar a função de validação deve quebrar toda a aplicação 
      const isValid = orderBusiness._validateRequiredField(order)
      expect(isValid).toBeTruthy()

      const result = orderBusiness._create(order)
      expect(result).toBeTruthy()
    })
    test('Execution Order Business with Template Method', () => {
      const order = new Order({
        customer: 1,
        amount: 100.00,
        products: [{ description: 'ferrari' }]
      })

      const orderBusiness = new OrderBusiness()
      const calledValidationFn = jest.spyOn(
        orderBusiness,
        orderBusiness._validateRequiredField.name
      )
      const calledCreateFn = jest.spyOn(
        orderBusiness,
        orderBusiness._create.name
      )

      //com template method, a sequencia de passo é sempre executada
      //evita a replicacao de logica
      const result = orderBusiness.create(order)

      expect(result).toBeTruthy()
      expect(calledValidationFn).toHaveBeenCalled()
      expect(calledCreateFn).toHaveBeenCalled()
    })
  })

})