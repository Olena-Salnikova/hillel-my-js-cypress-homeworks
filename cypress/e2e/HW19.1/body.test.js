describe('Body element', () => {
    beforeEach(() => {
        cy.visit('/');
    });

// Test case to verify the presence of button Sign up in the body
    it('Should find button Sign up', () => {
        cy.contains('Sign up').should('be.visible');
    });
});