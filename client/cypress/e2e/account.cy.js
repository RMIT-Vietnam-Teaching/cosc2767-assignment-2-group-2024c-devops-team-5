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
    cy.get('.account-details input[name="firstName"]').should('exist');
  
    // Debug the value
    cy.get('.account-details input[name="firstName"]').invoke('val').then((value) => {
      cy.log('First Name value:', value); // Log the value for debugging
    });
  
    // Check if user data is displayed
    cy.get('.account-details input[name="firstName"]').should('have.value', 'Tung');
    cy.get('.account-details input[name="lastName"]').should('have.value', 'Tran');
  });
  

  it('updates the user profile successfully', () => {
    // Mock the API call for updating the profile
    cy.intercept('PUT', 'http://localhost:3000/api/user', {
      statusCode: 200,
      body: {
        user: {
          email: 'trantung@gmail.com',
          firstName: 'Jane',
          lastName: 'Doe',
          phoneNumber: '0987654321',
        },
      },
    }).as('updateProfile');

    // Update the profile fields
    cy.get('.account-details input[name="firstName"]').clear().type('Jane');
    cy.get('.account-details input[name="lastName"]').clear().type('Doe');
    cy.get('.account-details input[name="phoneNumber"]').clear().type('0987654321');

    // Submit the changes
    cy.get('.profile-actions').contains('button', 'Save changes').click();

    // Wait for the API call to complete
    cy.wait('@updateProfile');

    // Verify updated data
    cy.get('.account-details input[name="firstName"]').should('have.value', 'Jane');
    cy.get('.account-details input[name="lastName"]').should('have.value', 'Doe');
    cy.get('.account-details input[name="phoneNumber"]').should('have.value', '0987654321');
  });

});
