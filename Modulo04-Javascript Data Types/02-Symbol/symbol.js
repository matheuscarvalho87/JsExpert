const assert = require('assert')


// -----keys -> criar chave única a nível de referência de memória

const uniqueKey = Symbol("userName")
const user = {}

user["userName"] = 'value for normal Objects'
user[uniqueKey] = 'value for symbol'

// console.log('getting normal Objects:', user.userName)
// //getting normal Objects: value for normal Objects
// console.log('getting normal Objects:', user[Symbol("userName")])
// //getting normal Objects: undefined     <- sempre único em nível de endereço de memória

assert.deepStrictEqual(user.userName, 'value for normal Objects')

//sempre único em nível de endereço de memória
assert.deepStrictEqual(user[Symbol("userName")], undefined)
assert.deepStrictEqual(user[uniqueKey], 'value for symbol')

//Symbol não é exatamente privado, é mais dificil de acessar
// console.log('symbols', Object.getOwnPropertySymbols(user)[0])
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

//byPass - má Pratica(nem tem no codebase do node)
user[Symbol.for('password')] = 123
assert.deepStrictEqual(user[Symbol.for('password')], 123)
//---keys


// Weel Known Symbols
const obj = {
  //iterators(como o * faz por debaixo dos panos)
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        //remove o ultimo e retorna
        value: this.items.pop()
      }
    }
  })
}

// for (const item of obj) {
//   console.log('item', item)
// }

assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol('kItems')
class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg));
  }
  //basicamente, ta fazendo uma validação para dificultar a vida do usuário para acessar o symbol
  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== "string") throw new TypeError()
    const itens = this[kItems].map(item =>
      new Intl.DateTimeFormat("pt-BR", { month: "long", day: "2-digit", year: "numeric" })
        .format(item)
    )

    return new Intl.ListFormat("pt-BR", { style: "long", type: "conjunction" }).format(itens)
  }
  //* valida que vai ser iterador pra usar yield
  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = ms => new Promise(r => setTimeout(r, ms))
    for (const item of this[kItems]) {
      await timeout(100)
      yield item.toISOString()
    }
  }
  get [Symbol.toStringTag]() {
    return 'WHAT?'
  }
}
const myDate = new MyDate(
  [2020, 03, 01],
  [2018, 02, 02]
)
const expectedDates = [
  new Date(2020, 03, 01),
  new Date(2018, 02, 02)
]

// console.log('mydate', myDate)

assert.deepStrictEqual(Object.prototype.toString.call(myDate), `[object WHAT?]`)
assert.throws(() => myDate + 1, TypeError)

//coerção explicita para chamar o toPrimitive
assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2018')

//implementar o iterator
assert.deepStrictEqual([...myDate], expectedDates)


  // ; (async () => {
  //   for await (const item of myDate) {
  //     console.log('asyncIterator', item)
  //   }
  // })()

  ; (async () => {
    const dates = Promise.all([...myDate])
    assert.deepStrictEqual(dates, expectedDates)
  })()