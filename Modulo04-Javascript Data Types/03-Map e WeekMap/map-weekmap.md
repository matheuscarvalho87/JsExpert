como visto em prototype chain vimos que quase tudo no js é herdado de Object e isso é bom e tbm ruim
pode ser um problema no paradigma da POO, uma vez que herdamos métodos da classe base todas as filhas
podem ser afetadas e isso tras risco.
o Map é uma especialização de Object, não é uma substituição, sim uma alternativa pro código
Indicado para cenários onde precisamos ficar removendo e alterados chaves dinamicamente
Evitar conflitos entre nomes de props herdadas do prototype chain e claro trazer uma semantica melhor 
para manipulçao dos dados.

Na prática usamos quando:
  - Precisamos adicionar chaves com frequência
  - Precisamos validar se a chave existe de forma semântica
  - Quando preciso que funcione como um BD, onde a chave é um objeto e temos um conjunto de dados
  - Limpar a referência após o uso

WEEKMAP:
se precisa somente adicionar e remover chaves e podemos pesquisar pelo id, temoso WEEKMAP
grande diferença é que so podemos usar objetos como chaves e não é numerador, então não
da pra navegar nele com 'for of', e tem menos métodos pra usar
Vantagem: performance, os dados so ficam nele enquanto existir em memória, faz referência direta ao endereço que estão o objeto