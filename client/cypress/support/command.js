Cypress.Commands.add('login', (email, password) => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: { email, password }
    }).then((response) => {
      window.localStorage.setItem('token', response.body.token)
    })
  })
  
  Cypress.Commands.add('loginAsMerchant', (email, password) => {
    cy.login(email, password)
    cy.visit('/merchant/dashboard')
  })
  
  Cypress.Commands.add('loginAsAdmin', (email, password) => {
    cy.login(email, password)
    cy.visit('/admin/dashboard')
  })

  Cypress.Commands.add('mockLogin', () => {
    // Mock the login API response
    cy.intercept('POST', 'http://localhost:3000/api/auth/login', {
      statusCode: 200,
      body: {
        token: 'Bearer mock-token', // Use the correct token format
        user: {
          email: 'trantung@gmail.com',
          firstName: 'Tran',
          lastName: 'Tung',
        },
      },
    }).as('mockLogin');

    // Simulate storing the token in localStorage
    localStorage.setItem('token', 'Bearer mock-token');
  
    // Optionally, mock user profile fetch 
    cy.intercept('GET', 'http://localhost:3000/api/user/me', {
      statusCode: 200,
      body: {
        user: {
          email: 'trantung@gmail.com',
          firstName: 'Tran',
          lastName: 'Tung',
        },
      },
    }).as('mockGetUser');
    
  });
  