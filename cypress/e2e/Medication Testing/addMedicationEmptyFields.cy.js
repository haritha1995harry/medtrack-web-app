describe('Add Medication Negative Test - Empty fields', () => {
  it('should give error as please fill the field', () => {

    cy.visit('http://localhost:3000/login');

    cy.get('input[name="email"]').type('mr.binara@gmail.com');
    cy.get('input[name="password"]').type('1234');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');

    cy.visit('http://localhost:3000/medications');

    cy.get('button[type="submit"]').click();
    cy.get('input[name="sicknessName"]').then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
    });

    cy.get('input[name="sicknessName"]').type('High Blood Pressure');
    
    cy.get('button[type="submit"]').click();
    cy.get('input[name="description"]').then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
    });
    cy.get('input[name="description"]').type('Daily medication for high blood pressure control.');


    cy.get('button[type="submit"]').click();
    cy.get('input[name="startDate"]').then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
    });
    cy.get('input[name="startDate"]').type('2025-06-01');
    cy.get('input[name="endDate"]').type('2025-06-30');

    cy.get('input[type="checkbox"][value="Tuesday"]').check();
    cy.get('input[type="checkbox"][value="Friday"]').check();

    cy.get('button[type="submit"]').click();
    cy.get('input[type="time"].occurrenceTime').first().then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
    });
    cy.get('input[type="time"].occurrenceTime').first().type('08:30');


    cy.get('button[type="submit"]').click();

    cy.contains('High Blood Pressure').should('be.visible');
    cy.contains('Tuesday').should('be.visible');
    cy.contains('Friday').should('be.visible');

    cy.url().should('include', '/medications');
  });
});
