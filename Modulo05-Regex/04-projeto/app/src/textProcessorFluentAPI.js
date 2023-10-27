
const { evaluateRegex } = require('./util')
const Person = require('./person')
// o objetivo do Fluent API é executar tarefas
// e no fim, chama o build. Muito similar ao padrao Builder
// a difirença que aqui é sobre processos, o Builder sobre construção 
// de objetos


class TextProcessorFluentAPI {

  #content
  constructor(content) {
    this.#content = content
  }

  extractPeopleData() {
    // ?<= = fala que vai extrair os dados que virão depois desse grupo
    // [contratante|contratada] ou um ou outro,gmi (e a flag no fim da expressao  pra pegar maiusculo ou minusculo)
    // :\s{1} vai procurar o caracter literal do dois pontos seguindo de um espaço
    // tudo acima fica dentro de um parenteses para falar " vamos pegar daí pra frente"

    // (?!\s) negative look around, vai ignorar os contratantes do fim do documento (que tem só espaço a frente deles)
    // .*\n pega qualquer coisa até o primeiro \n
    // .*? non greety, esse ? faz com que ele pare na primeira recorrencia, assim ele evita ficar em loop

    // $ -> informar que a pesquisa acaba no fim da linha
    // g -> global
    // m -> multiline
    // i -> insensitive
    const matchPerson = evaluateRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi)
    const onlyPerson = this.#content.match(matchPerson)
    this.#content = onlyPerson
    return this
  }

  removeEmptyCharacters() {
    const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g)
    this.#content = this.#content.map(line => line.map(item => item.replace(trimSpaces, "")))
    return this
  }

  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/)
    this.#content = this.#content.map(line => line.split(splitRegex))
    return this
  }

  mapPerson() {
    this.#content = this.#content.map(line => new Person(line))
    return this
  }

  build() {
    return this.#content
  }
}

module.exports = TextProcessorFluentAPI