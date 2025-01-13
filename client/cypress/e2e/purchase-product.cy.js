describe('Making an Order', () => {
  beforeEach(() => {
    // Mock user login
    cy.mockLogin();

    cy.intercept('GET', 'http://localhost:3000/api/products/item/some-product-slug', {
      statusCode: 200,
      body: {
        product: {
          _id: 'product123',
          name: 'Test Product',
          description: 'Test description',
          price: 50.0,
          inventory: 5,
          imageUrl: 'https://example.com/product.jpg',
        },
      },
    }).as('fetchProductDetails');
    
  });

  it('navigates to the shop page', () => {
    // Step 1: Navigate to the shop page
    cy.visit('/shop');
    cy.url().should('include', '/shop');
    cy.get('[data-cy=product-list-item]').should('have.length.greaterThan', 0);
  });

  it('views product details', () => {
    // Navigate to the shop page
    cy.visit('/shop');
    cy.get('[data-cy=product-list-item]').should('have.length.greaterThan', 0);

    // Step 2: Click on the first product
    cy.get('[data-cy=product-list-item]').first().click();
    cy.url().should('match', /\/product\/.*/);
  });

  it('adds a product to the bag', () => {
    // Navigate to the shop page
    cy.visit('/shop');
    cy.get('[data-cy=product-list-item]').should('have.length.greaterThan', 0);

    // Click on the first product
    cy.get('[data-cy=product-list-item]').first().click();

    // Step 3: Add the product to the bag
    cy.get('.loading-indicator').should('not.exist');
    cy.get('.btn-add-to-bag').click();
  
  });

});
