import { faker } from "@faker-js/faker";

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

Cypress.Commands.add('signup', (
  name = faker.person.firstName().replaceAll("-", ""), 
  lastName = faker.person.lastName().replaceAll("-", ""),
  email = "olena_" + faker.internet.email(), 
  password = "OlenaQauto12345",) => {
    
    cy.visit("/");
    // Click on "Sign up" button and fill the form
    cy.get(".hero-descriptor_btn").click();
    cy.get("#signupName").type(name);
    cy.get('#signupLastName').type(lastName);
    cy.get("#signupEmail").type(email);
    cy.get("#signupPassword").type(password);
    cy.get("#signupRepeatPassword").type(password);
    cy.get("div.modal-footer button.btn.btn-primary").click();
    //Check that we are on the garage page
    cy.location().its("pathname").should("eq", "/panel/garage");
    //Check "Add car" button is visible and click on it
    cy.get("div.panel-page button.btn.btn-primary").should("be.visible");
});

Cypress.Commands.add('addCar', (brand = null, model = null, mileage = null) => {
        let carData = {};
        cy.get("div.panel-page button.btn.btn-primary").click();
        if (brand === null && model === null) {
          //Get random car brand from select options and select it
          cy.get("#addCarBrand option").then(options => {
              const randomIndex = Math.floor(Math.random() * options.length);
              const brand_id = options[randomIndex].value;
              //Save selected brand to use later for model selection
              carData.brand = options[randomIndex].text;
              cy.get("#addCarBrand").select(brand_id);
          });
          //1000ms wait for models to load
          cy.wait(2000);
          //Get random car model from select options and select it
           cy.get("#addCarModel option").then(options => {
            const randomIndex = Math.floor(Math.random() * options.length);
            const model_id = options[randomIndex].value;
            //Save selected model to use later for verification
            carData.model = options[randomIndex].text;
            cy.get("#addCarModel").select(model_id);
        });
        }
        if (mileage === null) {
          //Set random mileage
          mileage = faker.number.int({ min: 0, max: 999999 }).toString();
        } else {
          mileage = mileage.toString();
        }
        
        cy.get("#addCarMileage").type(mileage);
        cy.get("div.modal-footer button.btn.btn-primary").should("not.be.disabled").click();
        
        cy.then(() => {
        //Check that the car is added to the garage
        cy.get("li.car-item").should("contain.text", carData.brand);
        cy.get("li.car-item").should("contain.text", carData.model);
      
        cy.wait(2000);
        cy.get(".update-mileage-form_input").should("contain.value", mileage)
        
      });
        return cy.wrap(carData);
});

Cypress.Commands.add('removeAccount', () => {
    cy.visit("/panel/settings");
    cy.get("button.btn.btn-danger-bg").click();
    cy.get("div.modal-footer button.btn.btn-danger").click();
});
