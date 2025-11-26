import { faker } from "@faker-js/faker";

Cypress.Commands.add('apiSignup', (
  name = faker.person.firstName().replaceAll("-", ""), 
  lastName = faker.person.lastName().replaceAll("-", ""),
  email = "olena_" + faker.internet.email(), 
  password = "OlenaQauto12345",) => {
    
    const userData = {
        "name": name,
        "lastName": lastName,
        "email": email,
        "password": password,
        "repeatPassword": password
    };
    return cy.api({
        method: "POST",
        url: "/api/auth/signup",
        body: userData
    }).then((response) => {
        expect(response.status).to.eq(201);
        return userData; // Return user data for further use
    });
});

Cypress.Commands.add('apiSignin', (email, password) => {
    return cy.api({
        method: "POST",
        url: "/api/auth/signin",
        body: {
            email: email,
            password: password,
            remember: false
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        return response.body; // Return response body for further use
    });
});

Cypress.Commands.add('removeAccount', () => {
    cy.visit("/panel/settings");
    cy.get("button.btn.btn-danger-bg").click();
    cy.get("div.modal-footer button.btn.btn-danger").click();
    cy.location().its("pathname").should("eq", "/");
});
    
