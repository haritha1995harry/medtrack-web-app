describe('Login Negative Test - Empty fields', () => {
  it('Should give error as please fill the field', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('button[type="submit"]').click();
    cy.get('input[name="email"]').then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
    });
    cy.get('input[name="email"]').type('mr.binara@gmail.com');

    cy.get('button[type="submit"]').click();
    cy.get('input[name="password"]').then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
    });
    cy.get('input[name="password"]').type('1234');

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
  });
});
