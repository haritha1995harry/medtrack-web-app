describe('MedTrack End-to-End Test', () => {
  it('Should visit login page and perform login', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[name="email"]').type('mr.binara@gmaill.com');
    cy.get('input[name="password"]').type('1234');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid email').should('be.visible');
  });
});
