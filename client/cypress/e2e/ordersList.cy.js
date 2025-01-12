describe('Order Module Tests', () => {
  beforeEach(() => {
    // Perform real login
    cy.mockLogin();

    // Navigate to the orders dashboard
    cy.visit('/dashboard/orders');
  });

  it('displays a list of orders for the user', () => {
    // Verify orders are displayed
    cy.url().should('include', '/dashboard/orders');
    cy.get('[data-cy=order-list-item]').should('have.length.greaterThan', 0);
  });

  it('navigates to the order details page', () => {
    cy.get('[data-cy=order-list-item]').first().click();
    cy.url().should('match', /\/order\/.*/);
    cy.get('[data-cy=order-details]').should('exist');
  });
});
