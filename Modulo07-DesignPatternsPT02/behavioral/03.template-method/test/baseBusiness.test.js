import { expect, describe, jest, beforeEach } from '@jest/globals'
import BaseBusiness from '../src/business/base/baseBusiness.js'
import { NotImplementedExpection } from '../src/util/exceptions.js'

describe("#BaseBusiness", () => {

  beforeEach(() => {
    jest.restoreAllMocks()
  })
  it("should throw an error when child class doesnt implement _validateRequiredField function", () => {
    // Basebusiness nunca sera acessada diretamente sempre por classes filhas
    class ConcreteClass extends BaseBusiness { }
    const concreteClass = new ConcreteClass()
    const validationError = new NotImplementedExpection(
      concreteClass._validateRequiredField.name
    )
    expect(() => concreteClass.create({}).toThrow(validationError))
  })

  it("should throw an error when _validateRequiredField returns false", () => {
    const VALIDATION_DOESNT_SUCCEEDED = false
    class ConcreteClass extends BaseBusiness {
      _validateRequiredField = jest.fn().mockReturnValue(VALIDATION_DOESNT_SUCCEEDED)
    }
    const concreteClass = new ConcreteClass()
    const validationError = new Error(`invalida data!`)

    expect(() => concreteClass.create({}).toThrow(validationError))
  })

  it("should throw an error child class doesnt implement _create function", () => {
    const VALIDATION_SUCCEEDED = true
    class ConcreteClass extends BaseBusiness {
      _validateRequiredField = jest.fn().mockReturnValue(VALIDATION_SUCCEEDED)
    }
    const concreteClass = new ConcreteClass()
    const validationError = new NotImplementedExpection(
      concreteClass._create.name
    )

    expect(() => concreteClass.create({}).toThrow(validationError))
  })

  it("should call _create and _validateRequiredField on create", () => {
    const VALIDATION_SUCCEEDED = true
    const CREATED_SUCCEEDED = true
    class ConcreteClass extends BaseBusiness {
      _validateRequiredField = jest.fn().mockReturnValue(VALIDATION_SUCCEEDED)
      _create = jest.fn().mockReturnValue(CREATED_SUCCEEDED)
    }
    const concreteClass = new ConcreteClass()
    const createFromBaseClass = jest.spyOn(
      BaseBusiness.prototype,
      BaseBusiness.prototype.create.name
    )
    const result = concreteClass.create({})
    expect(result).toBeTruthy()
    expect(createFromBaseClass).toHaveBeenCalled()
    expect(concreteClass._validateRequiredField).toHaveBeenCalled()
  })
})