describe('Header elements', () => {
    const expectedHeaderLinks = [
        "Home",
        "About",
        "Contacts"
    ]
    
    const authLinks = [
        "Guest log in",
        "Sign In"
    ]
    
    beforeEach(() => {
        cy.visit('/');
    });

// Test case to verify the presence of logo in the header
    it('Logo sould be visible', () => {
        cy.get('a.header_logo').should('be.visible');
    });

// Test case to verify the presence of menu items in the header
    it('Should find all menu items in the header', () => {
        cy.get("nav.header_nav .header-link").each(($link) => {
            cy.wrap(expectedHeaderLinks).should('contain', $link.text());
        })
    });

// Test case to verify the presence of authentication buttons in the header    
    it('Should find the Guest log in and Sign in buttons', () => {
        cy.get("div.header_right button").each(($link) => {
            cy.wrap(authLinks).should('contain', $link.text());
        })
    });
});