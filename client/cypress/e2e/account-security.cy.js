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

  it('validates form inputs before submission', () => {
    // Submit the form with empty fields
    cy.get('button[type="submit"]').click();

  
    // Verify error messages for required fields
    cy.get('input[name="password"]')
      .parent()
      .should('contain', 'Password is required.');
    cy.get('input[name="confirmPassword"]')
      .parent()
      .find('.invalid-message')
      .should('contain', 'Confirm Password is required.');
  });
  
  it('displays an error for mismatched passwords', () => {
    // Fill out the form with mismatched passwords
    cy.get('input[name="password"]').type('NewPassword123');
    cy.get('input[name="confirmPassword"]').type('DifferentPassword123');
  
    // Ensure only the specific button is clicked
    cy.get('[data-cy="reset-actions"] button[type="submit"]').click();
  
    // Verify error message for mismatched passwords
    cy.get('input[name="confirmPassword"]')
      .parent()
      .find('.invalid-message')
      .should('contain', 'Passwords do not match.');
  });
  
});
