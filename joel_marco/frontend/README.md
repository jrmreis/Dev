# SparkWeb Frontend

Este módulo contém o código-fonte do frontend do projeto, incluindo os arquivos HTML, CSS, Javascript e Vue.

O projeto de frontend é desenvolvido usando o VueJs e demais bibliotecas Javascript e CSS.

## Instalação
O passo a passo de instalação do projeto inteiro já contempla a instalação do frontend. Entretanto, caso queira 
instalá-lo separadamente, basta `$ npm install`. Este comando instala todas as dependências descritas no `package.json`, 
incluindo o Vue, Vue Router e Vuex.

## Dependências
Todas as dependências utilizadas estão em package.json. As principais são:

### Vue 
Um framework Javascript que oferece uma interface para ciclo de vida de componentes e abstração para manipulação de 
eventos e DOM. A escolha do Vue se deve principalmente pela sua facilidade de aprendizado para quem já tem conhecimento
básico em HTML e Javascript -- principalmente quando comparado com ReactJS e Angular -- e também porque ele é facilmente
plugável, ou seja, caso queira utilizar o Vue apenas em algumas páginas e deixar outras em HTML e Javascript puro, você
pode fazer isso com facilidade.

### Vuex
Um dos maiores desafios em desenvolver software é gerenciar os estados e os dados. No desenvolvimento web e frontend isso 
não é diferente. O Vuex permite gerenciar melhor os estados dos componentes e centraliza o acesso aos dados, de forma a
facilitar e não permitir inconsistências de dados.

### Vue Router
Permite o gerenciamento de rotas das views (que basicamente são as páginas). Com o Vue Router, você pode facilmente 
gerenciar as rotas que só podem ser acessadas para quem está autenticado, rotas encadeadas (por exemplo: /users/id é 
filha da rota /users), parâmetos em rotas (id, por exemplo /users/12345 ou /users/54321).


## Guia de código
Código-fonte em Javascript pode se tornar uma verdadeira bagunça caso não siga uma padronização. 
A fim de manter consistência em todo o código-fonte:

- Indentação em HTML, Javascript, CSS e SCSS: 2 espaços
- Padrão Javascript: [Javascript Standard](https://standardjs.com/), com [ESLINT](https://eslint.org/) configurado para apontar erro caso o padrão não seja seguido

Existe um arquivo .editorconfig que configura a sua IDE para já formatar automaticamente desta forma. Para instruções de
como utilizar o .editor config na sua IDE: https://editorconfig.org/

## Deploy
Atualmente existe uma GitHub Action para fazer o deploy automático no Elastic Beanstalk toda vez que um commit for realizado
na master ou um pull request para a master for aprovado.
Entretanto, caso queira fazer um build manualmente, basta: `$ npm run build`.