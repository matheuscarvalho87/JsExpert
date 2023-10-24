'use strict'

const Event = require('events')
const event = new Event()
const eventName = 'counter'
event.on(eventName, msg => console.log('Counter updated', msg))

const myCounter = {
  counter: 0
}

const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey] })
    target[propertyKey] = newValue
    return true
  },
  get: (object, prop) => {
    // console.log('chamou!', { object, prop })
    return object[prop]
  }
})

// jaja e sempre!
setInterval(function () {
  proxy.counter += 1
  console.log('[3]:setInterval')
  if (proxy.counter === 10) clearInterval(this)
}, 200)

//futuro
setTimeout(() => {
  proxy.counter = 4
  console.log('[2]:setTimeout')
}, 100)
//ma pratica colocar o 0 no set timeout para executar ele ao iniciar

//se quer executar agora
setImmediate(() => {
  proxy.counter = 6
  console.log('[1]:setImmediate')
})
//executa agora, agorinha, mas acaba com o ciclo de vida do node, tem prioridade total
process.nextTick(() => {
  proxy.counter = 2
  console.log('[0]: nextTick')
})