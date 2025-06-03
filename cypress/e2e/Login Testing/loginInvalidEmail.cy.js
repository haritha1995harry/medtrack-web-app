describe('Login Negative Test - Invalid email', () => {
  it('Should give error invalid email', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[name="email"]').type('mr.binara@gmaill.com');
    cy.get('input[name="password"]').type('1234');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid email').should('be.visible');
  });
});
