const { evaluateRegex } = require('./util')

class Person {
  //(\w+):\s.*,  <- usamos no replace pra pegar o objeto e remover as keys e :
  constructor([
    nome,
    nacionalidade,
    estadoCivil,
    documento,
    rua,
    numero,
    bairro,
    estado,
  ]) {
    // (\w+),
    // this.$1=$1 <- regex para pegar prop nos parametros do constructor e adicionar o this. =

    // ^ -> começo da string
    // + -> um ou mais ocorrencias
    // (\w{1}) - pega só a primeira letra e deixa em um grupo
    // (a-zA-Z) -> encontra letras maiusculas ou minusculas, adicionamos o + para ele pegar todas até o caracter especial
    // g -> todas as ocorrencias que encontrar 

    const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/g)
    const formatFirsLetter = (prop) => {
      return prop.replace(firstLetterExp, (fullMatch, group1, group2, index) => {
        return `${group1.toUpperCase()}${group2.toLowerCase()}`
      })
    }
    this.nome = nome
    this.nacionalidade = formatFirsLetter(nacionalidade)
    this.estadoCivil = formatFirsLetter(estadoCivil)
    //tudo que nao for dígito a gente remove
    // /g serve para remover todas as ocorrencias que encontrar
    this.documento = documento.replace(evaluateRegex(/\D/g), "")
    //começa a procurar depois do " a " e pega tudo que tem a frente
    // (?<= faz com que ignore tudo que tiver antes desse match
    // conhecido como positive lookBehind
    this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/)).join()
    this.numero = numero
    // começa a busca depois do espaço , pega qualquer letra ou digito até o fim da linha
    this.bairro = bairro.match(evaluateRegex(/(?<=\s).*$/)).join()
    this.estado = estado.replace(evaluateRegex(/\.$/), "")
  }

}

module.exports = Person 