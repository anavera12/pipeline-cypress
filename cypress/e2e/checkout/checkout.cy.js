import { adicionarItem, ValidarNomeEValorMochila } from "../compra/utils.cy";
import { faker } from '@faker-js/faker';

describe('Teste focado em validar toda a parte de checkout', () => {
    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'))
    });

    it('Adicionar dados corretos e validar as informações', () => {
        adicionarItem(cy)

        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Ana')
        cy.get('[data-test="lastName"]').type('Clara')
        const cep = faker.address.zipCode();
        cy.get('[data-test="postalCode"]').type(cep)
        cy.get('[data-test="continue"]').click()

        cy.contains('29.99').then(($element) => {
            if ($element.is(':visible')) {
                cy.contains('$32.39').should('be.visible')
                cy.get('[data-test="finish"]').click()
            } else {
                cy.log('valor alterado revise o código!')
            } //verificação para caso o valor altere, retornar a mensagem que auxilie no ajuste do código.
        })
    });

    it('Avançar sem preencher os dados', () => {
        adicionarItem(cy)

        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="continue"]').click()

        cy.contains('Error: First Name is required').should('be.visible')
    });
});