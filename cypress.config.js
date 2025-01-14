const cypress = require("cypress");
const { defineConfig } = require("cypress");
const dotenv = require('dotenv');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const env = dotenv.config().parsed;
      config.env = { ...config.env, ...env };
      config.viewportWidth = 1920;
      config.viewportHeight = 1080;

      config.env.USER_NAME = process.env.USER_NAME
      config.env.PASSWORD = process.env.PASSWORD
      return config;
    },
    baseUrl: 'https://www.saucedemo.com',
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    specPattern: [
      'cypress/e2e/carrinho.cy.js',
    ], //utilizei do specPattern para chamar apenas o arquivo de carrinho e ignorar o de utils.cy
    env: { ...process.env },
  },
});
