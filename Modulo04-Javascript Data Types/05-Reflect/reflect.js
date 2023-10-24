'use strict'

const assert = require('assert')

// garantir semantica e segurança em objetos

// ------apply

const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue
  }
}

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130)

//um problema que pode acontecer(raro)
// Function.prototype.apply = () => { throw new TypeError('EITA!') }

// esse aqui pode acontecer!
myObj.add.apply = function () { throw new TypeError('VISHHHH') }


assert.throws(
  () => myObj.add.apply({}, []),
  {
    name: "TypeError",
    message: 'VISHHHH'
  }

)


//USANDO REFLECT:

const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 50 }, [30])
assert.deepStrictEqual(result, 120)
//-----apply


// --defineProperty

//questoes semanticas
function MyDate() { }

Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey there' })

Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey dude' })

assert.deepStrictEqual(MyDate.withObject(), 'Hey there')
assert.deepStrictEqual(MyDate.withReflection(), 'Hey dude')


// --deleteProperty
const withDelete = { user: 'ErickWendel' }
//impoerfomático, evitar ao máximo
delete withDelete.user
assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

//usando Reflect
const withReflection = { user: 'XuxaDaSilva' }
Reflect.deleteProperty(withReflection, "user")
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)
//---- delete Property

// -----get

//Deveríamos fazer um get somente em instacias de referencia
assert.deepStrictEqual(1['userName'], undefined)
//const reflection uma exceção é lançada!
assert.throws(() => Reflect.get(1, "userName"), TypeError)
//---- get





//------- has
assert.ok('superman' in { superman: '' })
assert.ok(Reflect.has({ batman: '' }, "batman"))
//------- has

// --- ownKeys
const user = Symbol('user')
const databaseuser = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'erickwendel'
}

const objectKeys = [
  ...Object.getOwnPropertyNames(databaseuser),
  ...Object.getOwnPropertySymbols(databaseuser),
]

console.log('objectKeys', objectKeys)
assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user])

// com reflection, só um método é necessário
assert.deepStrictEqual(Reflect.ownKeys(databaseuser), ['id', Symbol.for('password'), user])