describe('Navigation', () => {
  beforeEach(() => {

    cy.request('/api/debug/reset')

    cy.visit('/');

  });

  it('should navigate to Tuesday', () => {

    cy.contains('li', 'Tuesday')
      .click()
      .should('have.class', 'day-list__item--selected')
  });

});
