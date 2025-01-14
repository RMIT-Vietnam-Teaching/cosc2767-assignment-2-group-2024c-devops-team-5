describe('Customer Dashboard Tests', () => {
  beforeEach(() => {
    cy.mockLogin();

    // Mock orders API
    cy.intercept('GET', 'http://localhost:3000/api/order/me?page=1&limit=20', {
      statusCode: 200,
      body: {
        orders: [
          {
            _id: 'order123',
            created: '2025-01-15T10:00:00Z',
            totalWithTax: 100,
            products: [{ status: 'Delivered' }],
          },
          {
            _id: 'order124',
            created: '2025-01-10T10:00:00Z',
            totalWithTax: 50,
            products: [{ status: 'Shipped' }],
          },
        ],
        totalPages: 1,
        currentPage: 1,
        count: 2,
      },
    }).as('fetchOrders');

    cy.visit('/dashboard');
  });

  it('navigates to the Orders page and displays orders', () => {
    // Click the Orders link in the sidebar
    cy.get('.panel-sidebar').contains('Orders').click();

    // Wait for the orders API to load
    cy.wait('@fetchOrders');

    // Verify URL
    cy.url().should('include', '/dashboard/orders');

    // Verify Number of Orders
    cy.get('.order-details').should('have.length', 2);
  });

  it('searches for an order using order ID', () => {
    // Navigate to Orders Page
    cy.get('.panel-sidebar').contains('Orders').click();
    cy.wait('@fetchOrders');
  
    // Perform the search
    cy.get('input[name="order"]').type('order123');
  
    // Verify the search results
    cy.get('.order-list .order-box').should('have.length', 1);
    cy.get('.order-list .order-box').should('contain', 'Order # order123');
  });
  

  it('displays no results for a nonexistent order ID', () => {
    // Navigate to Orders Page
    cy.get('.panel-sidebar').contains('Orders').click();
    cy.wait('@fetchOrders');
  
    // Perform the search
    cy.get('input[name="order"]').type('order125');
  
    // Verify the search results
    cy.get('.order-list .order-box').should('have.length', 0);
    cy.get('.not-found').should('contain', 'You have no orders yet.');
  });
});
