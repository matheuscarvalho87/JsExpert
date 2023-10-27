#expressões pelo terminal
# a partir da pasta raiz do projeto
find . -name *.test.js
find . -name *.test.js -not -path '*node_modules**'
find . -name *.js -not -path '*node_modules**'

npm i -g ipt
find . -name *.js -not -path '*node_modules**' | ipt

#substitui os arquivos escolhido adicionando use strict
CONTENT="'use strict;'"
find . -name *.js -not -path '*node_modules**' \
| ipt -o \ 
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}
 #executa um comando para cada item que foi retornado a partir do find
#sed = ferramenta de subtituição do unix
#-i = edição
#1s = primeira linha
#^ = primeira coluna
#/g' = faz a quebra de linha
