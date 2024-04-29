/// <reference types="cypress" />


describe('Todo issues E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have a form', () => {
    cy.get('input[type="text"]').should('have.value', '');
    cy.get('button[type="submit"]').should('have.text', 'Load issues');
  });

  it('should do fetch', () => {
    cy.intercept('GET', '**/issues').as('getIssues');
    cy.intercept('GET', '**/repos/VeDono/mavic').as('getRepo');

    cy.get('input[type="text"]').should('have.value', '');

    cy.get('input[type="text"]').type('https://github.com/VeDono/mavic').should('have.value', 'https://github.com/VeDono/mavic');
    cy.contains('Load issues').click();

    cy.wait(['@getIssues', '@getRepo']);

    cy.get('article[data-rbd-droppable-id="todo"]').find('div.ant-card').should('exist');
    cy.get('input[type="text"]').should('have.value', '');
  });
})