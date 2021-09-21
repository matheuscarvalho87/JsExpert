class Fibonacci{
  *execute(input, current=0, next =1){
    // console.count("count")
    if(input===0){
      return 0
    }
    //retorna um valor
    yield current
    //delega uma execução e nao retorna o valor
    yield* this.execute(input -1, next, current + next)
  }
}

module.exports = Fibonacci