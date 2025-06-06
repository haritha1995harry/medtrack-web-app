describe('Login Negative Test - Invalid password', () => {
  it('Should give error invalid password', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[name="email"]').type('mr.binara@gmail.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid email or password').should('be.visible');
  });
});
