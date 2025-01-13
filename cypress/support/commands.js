Cypress.Commands.add('login', (username, password) => {
    cy.visit('/')

    cy.get('[data-test="username"]').type(Cypress.env('username'), {log: false}) //utilizei o log: false para mascarar os dados sensíveis no log
    cy.get('[data-test="password"]').type(Cypress.env('password'), {log: false})

    cy.get('[data-test="login-button"]').click()

    cy.contains('Add to cart').should('be.visible')

})

//Não foi utilizado o cy.session, pois o site não comportou muito bem.