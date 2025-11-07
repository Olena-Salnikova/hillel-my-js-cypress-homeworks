describe("Google main page", () => {
  it("should open Google homepage", () => {
    // Open Google homepage
    cy.visit("https://www.google.com")

    // Check that the search input is visible
    cy.get('textarea[name="q"]').should('be.visible')

    // Check that the page title contains "Google"
    cy.title().should("include", "Google")
  })
})