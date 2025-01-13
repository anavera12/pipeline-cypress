import { ValidarNomeEValorMochila, adicionarItem } from "./utils.cy";

//O formato escolhido para os testes foi com foco na experiência do usuário, UI.
//Por esse motivo não foi utilizado cy.intercept ou validações diretas na api.

describe('Teste focado em validar o carrinho', () => {
    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'))
    });

    it('Adicionar 1 item e validar seu valor, nome e quantidade', () => {
        adicionarItem(cy)
    });

    it('Adicionar múltiplos itens e validar seu valor, nome e quantidade', () => {

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        ValidarNomeEValorMochila(cy)

        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.contains('Sauce Labs Bike Light' && '9.99').should('be.visible')

        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        cy.contains('Sauce Labs Bolt T-Shirt' && '15.99').should('be.visible')

        cy.get('[data-test="shopping-cart-link"]').click()
        ValidarNomeEValorMochila(cy)

        cy.contains('Sauce Labs Bike Light' && '9.99').should('be.visible')
        cy.contains('Sauce Labs Bolt T-Shirt' && '15.99').should('be.visible')

        cy.get('[data-test="item-quantity"]').should('be.visible', '3')
    });

    it('Retirar o item e validar se a quantidade altera de acordo', () => {
        adicionarItem(cy)
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('not.exist')
    });
})