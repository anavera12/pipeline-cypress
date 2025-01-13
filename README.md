# Testes Automatizados no Swag Labs com Cypress

Este repositório contém testes automatizados para o **SwagLabs**, um site de compra e autenticação simulado, desenvolvidos utilizando o framework [Cypress](https://www.cypress.io/). 

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades Testadas](#funcionalidades-testadas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Informações adicionais](#informações-adicionais)

## Sobre o Projeto

O Swag Labs é um projeto de demonstração disponibilizado pela Sauce Labs que simula uma aplicação de e-commerce para fins de estudo e prática de testes (principalmente testes de automação).


Os testes automatizados cobrem diferentes cenários, como casos de sucesso e falhas esperadas.

Usuário escolhido para os testes: 
standard_user: Usuário “comum” que consegue usar o site sem problemas.

## Funcionalidades Testadas

- **Login**: Escolhi mostrar diferentes formas de se realizar o login.
- **Carrinho de compras**: Simular adição e remoção de produtos no carrinho, visualizar os itens selecionados, total e contagem de itens.
- **Checkout**: Simular o processo de finalização da compra, incluir dados como nome, sobrenome e CEP (fictícios).
  
## Tecnologias Utilizadas

- [Cypress]: Framework de testes automatizados E2E.
- [VSCode]: IDE de desenvolvimento
- [Node.js]: Ambiente de execução para JavaScript.

## Impedimentos🚨

#### Login

- Não utilizei a opção de armazenamento de cookie para os testes, pos não achei que encaixou bem com a performance do site.
- Não foi adicionar o .env dentro do .gitignore por serem dados públicos, e para ficar de maior facilidade para acessar os dados.
