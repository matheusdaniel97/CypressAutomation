/// <reference types="cypress" />

describe('home', () => {
  it('webapp should be online', () => {
    cy.visit('/') //Visit the link 

    cy.title().should('eq', 'Gerencie suas tarefas com Mark L') //Assert that in title is equal to 'Gerencie suas tarefas com Mark L'
  })
})