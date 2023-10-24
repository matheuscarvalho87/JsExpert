const assert = require('assert')


const arr1 = ["0", "1", "2"]
const arr2 = ["2", "0", "3"]
const arr3 = arr1.concat(arr2)
// console.log('arr3', arr3.sort())
assert.deepStrictEqual(arr3.sort(), ['0', '0', '1', '2', '2', '3'])

const set = new Set()
arr1.map(item => set.add(item))
arr2.map(item => set.add(item))
// console.log('set', set) // { { '0', '1', '2', '3' } }
assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3'])
// rest/spread
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ['0', '1', '2', '3'])

console.log('set.keys', set.keys())
console.log('set.values', set.values())

//no Array comun, para saber se um item existe
// [].indexOf('1') !== -1 ou [0].includes(0)

//mesma teoria do Map, mas você sempre trabalha com a lista toda
// não tem get, então voce pode saber se o item esta o nao no array e é isso.
// na documentação tem exemplos sobre como fazer uma interceção, saber o que tem em um lista
// e nao tem em outra, imaginando um query de BD no inner join, join left join ...

const users01 = new Set([
  'erick',
  'marizinha',
  'xuxa da silva'
])

const users02 = new Set([
  'joaozinho',
  'erick',
  'julio'
])

const intersection = new Set([...users01].filter(user => users02.has(user)))
// console.log('Intersection', Array.from(intersection))
assert.deepStrictEqual(Array.from(intersection), ['erick'])

const difference = new Set([...users01].filter(user => !users02.has(user)))
console.log('Difference', Array.from(difference))
assert.deepStrictEqual(Array.from(difference), ['marizinha', 'xuxa da silva'])

// WEAK SET

const user = { id: 123 }
const user2 = { id: 321 }

const weakSet = new WeakSet([user])
weakSet.add(user2)
weakSet.delete(user)
weakSet.has(user)