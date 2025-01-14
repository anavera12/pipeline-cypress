Cypress.Commands.add('login', (USER_NAME, PASSWORD) => {
    cy.visit('/')

    cy.get('[data-test="username"]').type(Cypress.env('USER_NAME'), {log: false}) //utilizei o log: false para mascarar os dados sensíveis no log
    cy.get('[data-test="password"]').type(Cypress.env('PASSWORD'), {log: false})

    cy.get('[data-test="login-button"]').click()

    cy.contains('Add to cart').should('be.visible')

})

//Não foi utilizado o cy.session, pois o site não comportou muito bem.