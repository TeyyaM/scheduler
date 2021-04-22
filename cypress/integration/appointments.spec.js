describe('Appointments', () => {
  beforeEach(() => {

    cy.request('/api/debug/reset');

    cy.visit('/');

    cy.contains('Monday');

  });

  it('should be able to change days and still book an appointment', () => {

    cy.contains('li', 'Tuesday')
      .click()
      .should('have.class', 'day-list__item--selected');

    cy.get('[alt=Add]')
      .first()
      .click();

    cy.get('.appointment__card--create')
      .find('input')
      .type('Lydia Miller-Jones');

    cy.get('[alt="Sylvia Palmer"]')
      .click();

    cy.contains('button', 'Save')
      .click();

    cy.contains('Saving');

    cy.get('.appointment__card')
    cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
    cy.contains('.appointment__card--show', 'Sylvia Palmer');

  });

  it('should be able edit an appointment', () => {

    cy.get('.appointment__card--show')
      .first()
      .find('[alt=Edit]')
      .click({ force: true });

    cy.get('.appointment__card--create')
      .find('input')
      .type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}')
      .type('Lydia Miller-Jones');

    cy.get('[alt="Tori Malcolm"]')
      .click();

    cy.contains('button', 'Save')
      .click();

    cy.contains('Saving');

    cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
    cy.contains('.appointment__card--show', 'Tori Malcolm');
  });

  it('should cancel an interview', () => {
    cy.get('[alt=Delete]')
      .click({ force: true });

    cy.contains('Confirm').click();

    cy.contains('Deleting').should('exist');
    cy.contains('Deleting').should('not.exist');

    cy.contains('.appointment__card--show', 'Archie Cohen')
      .should('not.exist');
  });
});