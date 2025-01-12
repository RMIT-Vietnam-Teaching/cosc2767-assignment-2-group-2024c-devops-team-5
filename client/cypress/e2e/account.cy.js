describe('Account Container Tests', () => {
  beforeEach(() => {
    // Mock the login process
    cy.mockLogin();
  
    // Mock fetching the user profile
    cy.intercept('GET', 'http://localhost:3000/api/user/me', {
      statusCode: 200,
      body: {
        user: {
          email: 'trantung@gmail.com',
          firstName: 'Tung', // Use the expected value
          lastName: 'Tran',  // Use the expected value
          provider: 'Google',
          role: 'ROLE MEMBER',
        },
      },
    }).as('fetchProfile');  
    // Navigate to a page that requires authentication
    cy.visit('/dashboard');
    cy.url().should('include', '/dashboard');
  });
  

  it('renders the account details correctly', () => {
    // Wait for the profile to load
    cy.wait('@fetchProfile');
  
    // Ensure the input exists
    cy.get('[data-cy=account-details-firstName]').should('exist');
  
    // Debug the value
    cy.get('[data-cy=account-details-firstName]').invoke('val').then((value) => {
      cy.log('First Name value:', value); // Log the value for debugging
    });
  
    // Check if user data is displayed
    cy.get('[data-cy=account-details-firstName]').should('have.value', 'Tung');
    cy.get('[data-cy=account-details-lastName]').should('have.value', 'Tran');
  });
  

  it('updates the user profile successfully', () => {
    cy.get('[data-cy=account-details-firstName]').clear().type('Jane');
    cy.get('[data-cy=account-details-lastName]').clear().type('Doe');
    cy.get('[data-cy=account-details-phoneNumber]').clear().type('0987654321');
    cy.get('[data-cy=account-details-submit]').click();
  
    // Wait for the API call to complete
    cy.wait('@updateProfile');
  
    // Verify updated data
    cy.get('[data-cy=account-details-firstName]').should('have.value', 'Jane');
    cy.get('[data-cy=account-details-lastName]').should('have.value', 'Doe');
    cy.get('[data-cy=account-details-phoneNumber]').should('have.value', '0987654321');
  });

  it('resets the user profile to default state', () => {
    cy.get('[data-cy=account-details-reset]').click();
    cy.get('[data-cy=account-details-firstName]').should('have.value', '');
    cy.get('[data-cy=account-details-lastName]').should('have.value', '');
  });

  it('handles API errors gracefully', () => {
    cy.intercept('PUT', '/user', {
      statusCode: 400,
      body: { error: 'Invalid data' },
    }).as('updateProfileError');
    cy.get('[data-cy=account-details-submit]').click();
    cy.wait('@updateProfileError');
    cy.get('.notification-error').should('contain', 'Invalid data');
  });
});
