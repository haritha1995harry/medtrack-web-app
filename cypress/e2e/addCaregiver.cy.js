describe('Add Caregiver Test', () => {
  it('should add a new caregiver successfully', () => {

    cy.visit('http://localhost:3000/login');

    cy.get('input[name="email"]').type('mr.binara@gmail.com');
    cy.get('input[name="password"]').type('1234');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');

    cy.visit('http://localhost:3000/caregivers');

    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('johndoe@example.com');
    cy.get('input[name="contactNumber"]').type('1234567890');

    cy.get('button[type="submit"]').click();

    cy.contains('johndoe@example.com').should('be.visible');

    cy.url().should('include', '/caregivers');
  });
});
