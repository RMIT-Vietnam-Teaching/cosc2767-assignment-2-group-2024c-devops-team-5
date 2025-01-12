describe('Making an Order', () => {
    beforeEach(() => {
      // Mock user login
      cy.mockLogin();
    });
  
    it('navigates from homepage to shop, adds a product to the bag, and places an order', () => {
      // Step 1: Navigate to the shop page
      cy.visit('/shop');
      cy.url().should('include', '/shop');
      cy.get('[data-cy=product-list-item]').should('have.length.greaterThan', 0);
  
      // Step 2: Click on the first product
      cy.get('[data-cy=product-list-item]').first().click();
      cy.url().should('match', /\/product\/.*/);
  
      // Step 3: Add the product to the bag
      cy.get('.loading-indicator').should('not.exist'); 
      cy.get('[data-cy=add-to-bag-button]').should('exist').and('be.visible').click();
  
      // Verify product is added to the cart
      cy.get('[data-cy=cart-items]').should('contain', '1');
  
      // Step 4: Place the order
      cy.get('[data-cy=place-order-button]').should('not.be.disabled').click();
  
      // Verify order confirmation
      cy.url().should('match', /\/order\/success\/.*/);
      cy.get('.order-message').should('contain', 'Thank you for your order.');
      cy.get('.order-label').should('contain', '#');
    });
  });
  