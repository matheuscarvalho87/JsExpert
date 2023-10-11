const assert = require('assert')

function* calculation(arg1, arg2) {
  yield arg1 * arg2
}

function* main() {
  yield 'Hello'
  yield '-'
  yield 'World'
  yield '-'
  yield* calculation(20, 10) //sem o * não entende que é pra executar a função, retorna a função pra ser executada depois
}

const genarator = main()
// console.log(genarator.next())
// //{ value: 'Hello', done: false }
// console.log(genarator.next())
// // { value: 'Hello', done: false }
// // { value: undefined, done: false }
// console.log(genarator.next())
// // { value: 'Hello', done: false }
// // { value: '-', done: false }
// // { value: 'World', done: false }
// console.log(genarator.next())
// // { value: 'Hello', done: false }
// // { value: '-', done: false }
// // { value: 'World', done: false }
// // { value: '-', done: false }
// console.log(genarator.next())
// // { value: 'Hello', done: false }
// // { value: '-', done: false }
// // { value: 'World', done: false }
// // { value: '-', done: false }
// // { value: undefined, done: true }significa que terminou de percorrer a lista, assim que o for await funciona, ele checa os valores de done no generator
// //isso antes de colocar o yield* calculation()


// ///Colocando yield* calculation()
// console.log(genarator.next())
// // { value: 'Hello', done: false }
// // { value: '-', done: false }
// // { value: 'World', done: false }
// // { value: '-', done: false }
// // { value: 200, done: false }
// // { value: undefined, done: true }


//Comentado a cima pois com o assert verificamos o que é esperado
assert.deepStrictEqual(genarator.next(), { value: 'Hello', done: false })
assert.deepStrictEqual(genarator.next(), { value: '-', done: false })
assert.deepStrictEqual(genarator.next(), { value: 'World', done: false })
assert.deepStrictEqual(genarator.next(), { value: '-', done: false })
assert.deepStrictEqual(genarator.next(), { value: 200, done: false })
assert.deepStrictEqual(genarator.next(), { value: undefined, done: true })

assert.deepStrictEqual(Array.from(main()), ['Hello', '-', 'World', '-', 200])
assert.deepStrictEqual([...main()], ['Hello', '-', 'World', '-', 200])


// ----- async iterators
//pra trabalhar com promises temos que usar async iterators
const { readFile, stat, readdir } = require('fs/promises')

function* promisified() {
  yield readFile(__filename)
  yield Promise.resolve('Hey Dude')
}

async function* systemInfo() {
  const file = await readFile(__filename)
  yield { file: file.toString() }
  const { size } = await stat(__filename)
  yield { size }

  const dir = await readdir(__dirname)
  yield { dir }
}

// Promise.all([...promisified()]).then(results => console.log('promisified', results))
; (async () => {
  for await (const item of systemInfo()) {
    console.log('Systeminfo', item)
  }
})()