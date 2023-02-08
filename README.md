# Gerador de certificado

# Indice

- [Gerador de certificado](#gerador-de-certificado)
- [Indice](#indice)
  - [📑 Sobre](#-sobre)
  - [🚀 Tecnologias utilizadas](#-tecnologias-utilizadas)
  - [📓 Como utilizar](#-como-utilizar)
  - [📦 Como baixar o projeto](#-como-baixar-o-projeto)

## 📑 Sobre

O projeto é formado por 2 serviços: a api principal que recebe os dados do usuário e envia para o segundo serviço, o gerador de certificado, que gera o certificado e envia a confirmação para a api principal.

---

## 🚀 Tecnologias utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias :

- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Node.js](https://nodejs.dev/)
- [Express](https://expressjs.com/pt-br/)
- [RabbitMQ](https://www.rabbitmq.com/)

---

## 📓 Como utilizar

Obs: Antes de utilizar, faça o passo a passo de [📦 Como baixar o projeto](#-como-baixar-o-projeto)

Para utilizar a api você deve simular com [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/) ou com o próprio navegador.

- Para gerar um certificado você deve utiliazr a url: http://localhost:3000/generate-certificate
- Os parâmetros são name, email, cpf e devem ser enviados por via query url.
  - Exemplo: http://localhost:3000/generate-certificate?name=leo&email=leo@gmail.com&cpf=12345678910

## 📦 Como baixar o projeto

```bash
    #Clonar o repositório
    $ git clone https://github.com/leogottardi/generate-certificate-rabbitmq.git

    #Entrar no diretório da api
    $ cd api

    #Instalar as dependencias
    $ npm install

    #Iniciar o servidor
    $ npm run start:dev

    #Entrar no diretório do gerador de certificado
    $ cd certificate

    #Instalar as dependencias
    $ npm install

    #Iniciar o serviço
    $ npm run start:dev
```
