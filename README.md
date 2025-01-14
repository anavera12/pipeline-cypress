# Como mascarar dados sensíveis na pipeline utilizando Cypress

Este repositório tem como objetivo demonstrar boas práticas para manter dados sensíveis (como senhas, tokens de API, chaves de acesso) seguros e mascarados quando executamos testes de ponta a ponta (E2E) com Cypress em uma pipeline de Integração Contínua (CI), usando GitHub Actions como exemplo.

## Índice

- [Importância do mascaramento de dados](#por-que-precisamos-mascarar-dados-sensíveis)
- [Repositório Secret](#criando-secrets-no-github)
- [Workflow secrets](#adicionando-secrets-no-arquivo-de-workflow)
- [Configurando o cypress](#configurando-o-cypress-para-usar-as-variáveis-de-ambiente)
- [Boas práticas](#boas-práticas-para-evitar-exposição-de-dados)
- [Informações adicionais](#informações-adicionais)

## 1. Por que precisamos mascarar dados sensíveis?

- Segurança: As informações confidenciais (senhas, tokens, etc.) não podem ficar expostas em arquivos versionados ou em logs de execução.
- Compliance: Dependendo da sua organização, existem regras de compliance que exigem esse cuidado.
- Boas práticas: Facilita a manutenção do projeto e evita vazamento de dados.

## 2. Criando Secrets no GitHub

- Acesse o repositório no GitHub.
- Vá em Settings > Secrets and variables > Actions.
- Clique em New repository secret.
- Crie uma secret para cada valor sensível (por exemplo: USER_NAME/PASSWORD, API_KEY, TOKEN).

Essas variáveis não ficam expostas no repositório e podem ser utilizadas apenas dentro dos arquivos de workflow do GitHub Actions.
  
## 3. Adicionando secrets no arquivo de workflow
No seu arquivo de workflow (.github/workflows/ci.yml), adicione as secrets como variáveis de ambiente para que o Cypress possa acessá-las:
```
name: Cypress Tests
on: push
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node
        uses: actions/setup-node@v3
        with: 
          node-version: v20.17.0
      - name: Install dependencies
        run:
          npm install
          npm run build
          npm run test
      - name: Run Cypress Tests
        run: npx cypress run
        env:
          USER_NAME: ${{ secrets.USER_NAME }}
          PASSWORD: ${{ secrets.PASSWORD }}
```
- secrets.USER_NAME e secrets.PASSWORD referem-se às secrets que você adicionou nas configurações do repositório.
- Esses valores não aparecem em texto puro nos logs do GitHub, pois o GitHub automaticamente os mascara.

## 4. Configurando o Cypress para usar as variáveis de ambiente
No arquivo de configuração do Cypress (cypress.config.js ou cypress.config.ts), você pode captar as variáveis de ambiente do sistema e atribuí-las ao objeto env do Cypress:
```
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Passa as variáveis de ambiente do sistema para o config do Cypress
      config.env.DB_PASSWORD = process.env.DB_PASSWORD;
      config.env.API_KEY = process.env.API_KEY;
      config.env.TOKEN = process.env.TOKEN;
      
      return config;
    },
  },
});
```
## 5. Boas práticas para evitar exposição de dados

- Não versionar o .env: Se você utiliza um arquivo .env para desenvolvimento local, adicione-o ao .gitignore. Os valores de produção ou staging devem ser configurados como secrets no GitHub, não no repositório.
- Evitar logs de variáveis sensíveis: Nunca utilize

## 6. Informações adicionais ❗❗

- As variaváveis que estão dentro do .env devem conter a mesma nomeclatura das variáveis adicionadas no respositório secret no github.
