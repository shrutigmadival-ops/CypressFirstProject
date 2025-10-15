describe('Flipkart Login Modal Tests', () => {
  beforeEach(() => {
    cy.visit('https://www.flipkart.com/');
  });

  it('should display the login modal when clicking on the Login link', () => {
    // Flipkart shows login popup automatically for some users
    // If it doesn’t, open it manually
    cy.contains('Login').click({ force: true });

    // Validate login modal visible
    cy.get('form').should('be.visible');

    // Check for username and password fields
    cy.get('input[type="text"]').should('be.visible').and('have.attr', 'placeholder', 'Enter Email/Mobile number');
    cy.get('input[type="password"]').should('be.visible');

    // Validate login button
    cy.contains('Request OTP').should('be.visible');
  });

  it('should show error message for invalid input', () => {
    cy.contains('Login').click({ force: true });

    // Enter invalid mobile number
    cy.get('input[type="text"]').type('12345');
    cy.contains('Request OTP').click();

    // Check for validation error
    cy.get('form').should('contain.text', 'Please enter valid Email ID/Mobile number');
  });
});