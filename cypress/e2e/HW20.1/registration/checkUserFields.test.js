import { el, faker } from "@faker-js/faker";
import users from "../../../fixtures/usersNegativeTests.json";
import usersPositive from "../../../fixtures/usersPositiveTests.json";

describe("Main page", () => {
    
    beforeEach(() => {
        console.log(users);
        cy.visit("/");
        // Click on "Sign up" button
        cy.get(".hero-descriptor_btn").click();
    });

    for (const {input, selector, expected, title} of users) {
        it(title, () => {
            // Fill in the registration form fields based on the test case
            if (input.text === "")  {
                cy.get(selector).focus().blur();
            } else {
                cy.get(selector).type(input.text).blur();
            }
           
            cy.get(".invalid-feedback").should("have.text", expected.message)
            cy.get("div.modal-footer button.btn.btn-primary").should("be.disabled");
            cy.get(selector).should("have.class", "is-invalid");
        })
    }

    for (const {input, title} of usersPositive) {
        it(title, () => {
            let pass;
            for (const field of input) {
                if (field.selector === "#signupPassword") {
                    pass = field.text;
                    cy.get(field.selector).type(field.text, { sensitive: true });
                } else {
                    cy.get(field.selector).type(field.text);
                }
            }

            let login = "olena_" + faker.internet.email();
            cy.get("#signupEmail").type(login);
            cy.get("div.modal-footer button.btn.btn-primary").should("not.be.disabled").click();
            cy.get(".text-danger").contains("Log out").click();
            cy.login(login, pass);
            cy.location().its("pathname").should("eq", "/panel/garage");
        })
    }
})
