export const ValidarNomeEValorMochila = (cy) => {
    cy.contains('Sauce Labs Backpack' && '29.99').should('be.visible')
    //como contém apenas 1 produto com esse valor na tela, optei por uma validação mais simples.
    /*
    por repetir em múltiplas linhas optei por reciclar o código, assim se por ventura o nome ou valor for alterado
    não será problemático realizar o ajuste.
    */
}

export const adicionarItem = (cy) => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    ValidarNomeEValorMochila(cy)

    cy.get('[data-test="shopping-cart-link"]').click()
    ValidarNomeEValorMochila(cy)

    cy.get('[data-test="item-quantity"]').should('be.visible', '1')
}