//curl "localhost:3000?salary=3000&discount=15"

//node inspect index.mjs
//list(100)
// setBreakpoint(24) ||sb()
// cont || c()
// ...

import http from 'http'

function netSalary({ discount, salary }) {
  const percent = (discount / 100)
  const cost = salary * percent
  const result = salary - cost

  return result
}


http.createServer((req, res) => {
  const url = req.url.replace('/', '')
  const params = new URLSearchParams(url)
  const data = Object.fromEntries(params)
  const result = netSalary(data)
  //debugger
  res.end(`Salário final é: ${result}`)
})
  .listen(3000, (err) => console.log('Servidor rodando na porta 3000'))