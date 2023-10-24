o Set auxilia na hora de comparar uma lista com outra,
* verificando se os elementos da primeira estao presentes na segunda.
evita que a gente tenha que ficar usando map e reduce para verificar se o elemento ja foi adicionado
a grande diferença para o Map é que o Set trabalha com listas, e cada item da lista ao invés de ser 
o índice ele vai ser uma chave

Weakset - em termos de ciclo de vida trabalha com o que se mantém antes da máquina fazer a limpeza de dados,
e ele basicamente é pra saber se o item existe na lista e adiciona novos items
 - não é enumerável
 - só trabalha com chaves como referencia
 - só tem método simples