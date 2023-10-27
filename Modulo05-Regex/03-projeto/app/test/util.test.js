const { describe, it } = require('mocha')
const { expect } = require('chai')
const { InvalidRegexError, evaluateRegex } = require('./../src/util')
const mock = require('./mock/valid')

describe('Util', () => {
  it("#evaluateRegex should throw an error using an unsafe regex", () => {
    const unsafeRegex = /^([a-z|A-Z|0-9]+s?)+$/
    //Forma de validar uma expressão direto de um terminal unix, abaixo roda em loop e quebra tudo
    // o + faz ele ficar em loop infinito caçando algo dentro da srting
    /*
      time \
      node --eval "/^([a-z|A-Z|0-9]+s?)+$/.test('eaee man como vai voce como vai voce como vai voce?') && console.log('legalzin')"
    */
    expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe dude!`)
  })

  it('#evaluateRegex should not throw an error using a safe regex', () => {
    const safeRegex = /^([a-z])$/
    expect(() => evaluateRegex(safeRegex)).to.not.throw
    expect(evaluateRegex(safeRegex)).to.be.ok
  })
})