import { faker } from "@faker-js/faker";

describe("Check add car", () => {
    
    beforeEach(() => {
        cy.signup();//custom command to sign up a new user
    });

    it("Add car with valid data", () => {
        cy.addCar();//custom command to add a car with random brand, model and mileage
    });

    it("Modify added car", () => {
        let car;
        cy.addCar().then((addedCar) => {
            car = addedCar;
            
            // Move all subsequent steps inside this .then() so they run after car is added
            cy.get("li.car-item").first().find("button.car_add-expense").click();
            cy.get("#addExpenseCar").should("have.text", car.brand + " " + car.model);
            
            cy.wait(2000);
            cy.get("#addExpenseMileage").invoke("val").then((currentMileage) => {
                const minValue = parseInt(currentMileage.toString().replace(/[^\d]/g, ""), 10);
                const newMileage = faker.number.int({min: minValue, max: 999999});
                cy.get("#addExpenseMileage").clear().type(newMileage.toString());
            });
            
            cy.get("#addExpenseLiters").clear().type(faker.number.int({ min: 1, max: 9999 }).toString());
            cy.get("#addExpenseTotalCost").clear().type(faker.number.int({ min: 1, max: 1000000 }).toString());
            cy.get("div.modal-footer button.btn.btn-primary").should("not.be.disabled").click();
        });
    });

    afterEach(() => {
        cy.removeAccount();//custom command to remove the created user account
    });
});