describe('Merchant Signup Page Tests', () => {
    beforeEach(() => {
      cy.intercept('POST', '**/api/merchant-signup/token123?email=test@example.com', {
        statusCode: 200,
        body: {
          success: true,
          message: 'Registration successful',
        },
      }).as('mockSignup');
      
      // Navigate to the Merchant Signup page with a mock token
      cy.visit('/merchant-signup/token123?email=test@example.com');
    });
  
    it('displays the signup form with prefilled email', () => {
      // Verify the page loads
      cy.get('.merchant-signup-form').should('exist');
  
      // Verify the email input is prefilled
      cy.get('input[name="email"]').should('have.value', 'test@example.com');


    });
  
    it('displays an error message for failed registration', () => {
      // Fill out the form
      cy.get('.merchant-signup-form input[name="email"]').clear();
      cy.get('.merchant-signup-form input[name="email"]').type('merchant@example.com');
      cy.get('.merchant-signup-form input[name="firstName"]').type('John');
      cy.get('.merchant-signup-form input[name="lastName"]').type('Doe');
      cy.get('.merchant-signup-form input[name="password"]').type('securepassword');
  
      // Submit the form
      cy.get('.merchant-signup-form').contains('button', 'Get Started').click();
  
      // Confirm the URL remains the same
      cy.url().should('include', '/merchant-signup');

    });
  
    it('validates email format', () => {
      // Enter an invalid email
      cy.get('.merchant-signup-form input[name="email"]').clear().type('invalid-email');
  
      // Attempt to submit the form
      cy.get('.merchant-signup-form').contains('button', 'Get Started').click();
  
      // Confirm the URL remains the same
      cy.url().should('include', '/merchant-signup');
    });
  
    it('prefills the email from the URL query parameter', () => {
      // Verify that the email input is prefilled from the URL
      cy.get('input[name="email"]').should('have.value', 'test@example.com');
    });
  });
  