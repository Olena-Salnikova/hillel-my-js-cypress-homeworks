Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    // turn off original log
    options.log = false
    // create our own log with masked message
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    })
  }

  return originalFn(element, text, options)
})

Cypress.Commands.add('login', (email, password) => {
    cy.visit("/");
    cy.get(".header_signin").click();
    cy.get("#signinEmail").type(email);
    cy.get("#signinPassword").type(password);
    cy.get("div.modal-footer button.btn.btn-primary").click();
});