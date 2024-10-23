# SparkWeb

![Compile](https://github.com/THCSGIT/spark-web/workflows/Compile/badge.svg)
![JVM](https://img.shields.io/badge/jvm-11-orange)
![Gradle](https://img.shields.io/badge/gradle-6.5-blue)

SparkWeb é uma plataforma para visualizar e analizar detalhes da trilha de logs do Spark. O SparkWeb é implementado em
Java 11 e a gestão de build e dependências com Gradle. O frontend é desenvolvido em [Vue.js](https://github.com/vuejs/vue),
com gestão de rotas com [Vue Router](https://github.com/vuejs/vue-router) e de dados e estados com o [Vuex](https://github.com/vuejs/vuex).

## Instalação
Para executar o SparkWeb em seu ambiente de desenvolvimento, você precisa ter instalado:
- [JDK 11](https://openjdk.java.net/install/) (Preferencialmente Open JDK)
- [Gradle](https://gradle.org/install/) (>= 6.5.1)
- [Nodejs](https://nodejs.org/en/) (>= 12.18.2)
- NPM (>= 6.14.6) (NPM já vem instalado com versões mais recentes do Nodejs. Para verificar se já está instalado, basta executar `npm --version`)
- [Git](https://git-scm.com/downloads) (>= 2.25.1)

1. Clone o repositório:
1.1 Por SSH `git clone git@github.com:THCSGIT/spark-web.git`
1.2 Por HTTPS `git clone https://github.com/THCSGIT/spark-web.git`
2. Para instalar as dependências do frontend, basta executar `$ npm install`  a partir do diretório `/frontend`, onde tem o arquivo `package.json`
3. No diretório raiz do projeto, execute a tarefa de build `gradle buildBackend`. Você pode verificar o que é realizado na
tarefa em build.gradle. Basicamente ela realiza todos esses passos (não é necessário executar):

i. Faz o build do frontend com o comando `npm run build`. Essa etapa é opcional para a executar o projeto em ambiente de desenvolvimento.

ii. Copia os arquivos do build do frontend para o backend. Desta forma, os arquivos estaticos do frontend são "servidos"
pelo backend, necessitando apenas executar o backend.

iii. Realiza o build do backend com o comando `./gradlew build`. Este comando compila o código-fonte do backend.


4. Para executar o backend, basta `./gradlew bootRun` a partir do diretório `/backend`
5. Para executar o frontend, basta `npm run serve` a partir do diretório `/frontend`.

Pronto! O backend deve estar disponível em `localhost:5000` e o frontend em `localhost:8080` :rocket:

Para mais detalhes sobre guia de desenvolvimento, nomenclaturas e arquitetura, consulte a documentação do [backend](backend/README.md) 
e do [frontend](frontend/README.md).

## Deploy
Atualmente, toda vez que um commit ou um Pull Request for aprovado na master, uma Action é executada o deploy é feito 
automaticamente no Elastic Beanstalk (se a compilação for bem-sucedida).