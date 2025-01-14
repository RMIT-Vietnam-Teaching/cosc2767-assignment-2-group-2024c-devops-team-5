describe('Account Security Page Tests', () => {
  beforeEach(() => {
    cy.reload()
    // Mock the login process
    cy.mockLogin();

    // Navigate to the Account Security page
    cy.visit('/dashboard/security');
  });

  it('renders the reset password form correctly', () => {
    // Check if the form and inputs exist
    cy.get('[data-cy="reset-password-form"]').should('exist');
    cy.get('input[name="password"]').should('exist').and('have.attr', 'placeholder', 'Old Password');
    cy.get('input[name="confirmPassword"]').should('exist').and('have.attr', 'placeholder', 'Confirm Password');
    cy.get('button[type="submit"]').should('contain', 'Reset Password');
  });

  it('validates form inputs using validation state', () => {
    // Intercept the form submission API call
    cy.intercept('POST', '/api/submit-form').as('formSubmit');

    // Submit the form with empty fields
    cy.get('.reset-password-form button[type="submit"]').click();

    // Wait for a short duration to ensure no API request is sent
    cy.wait(1000); // Adjust based on form validation timing

    // Confirm the API call was not made
    cy.get('@formSubmit').should('not.exist');

  });  
  
  it('blocks API call for mismatched passwords', () => {
    // Intercept the form submission
    cy.intercept('POST', '/api/reset-password').as('resetPassword');
  
    // Fill out the form with mismatched passwords
    cy.get('input[name="password"]').type('NewPassword123');
    cy.get('input[name="confirmPassword"]').type('DifferentPassword123');
  
    // Attempt to submit the form
    cy.get('.reset-password-form button[type="submit"]').click();
  
    // Verify no API call was made
    cy.wait(1000); // Adjust based on your form's timing
    cy.get('@resetPassword').should('not.exist');
  });
  
});
