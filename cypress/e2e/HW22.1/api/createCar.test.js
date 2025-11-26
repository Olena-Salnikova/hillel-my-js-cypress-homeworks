import { fa, faker } from "@faker-js/faker";

describe("Car creation via API", () => {
    beforeEach(() => {

        cy.apiSignup().then((userData) => {
            cy.apiSignin(userData.email, userData.password);
        });
    });

    it("Create car via API", () => {
        cy.api({
            method: "Get",
            url: "/api/cars/brands"
        })
        .its("body.data").as("brandsData");

        cy.api({
        method: "Get",
        url: "/api/cars/models"
        })
        .its("body.data").as("modelsData");

        cy.get("@brandsData").then((brands) => {
            //Get random brand
            const randomIndex = Math.floor(Math.random() * brands.length);
            const brand = brands[randomIndex];

            cy.get("@modelsData").then((models) => {
                const model = models.find(m => m.carBrandId === brand.id);
                const requestBody = {
                    carBrandId: brand.id,
                    carModelId: model.id,
                    mileage: faker.number.int({ min: 0, max: 999999 })
                };
                cy.api({
                    method: "POST",
                    url: "/api/cars",
                    body: requestBody
                }).then((response) => {
                    expect(response.status).to.eq(201);
                    expect(response.body.data.carBrandId).to.eq(requestBody.carBrandId);
                    expect(response.body.data.carModelId).to.eq(requestBody.carModelId);
                    expect(response.body.data.mileage).to.eq(requestBody.mileage);
                });
            });
        });
    });

    it("Create car via API and add expenses", () => {
        cy.api({
            method: "Get",
            url: "/api/cars/brands"
        })
        .its("body.data").as("brandsData");

        cy.api({
            method: "Get",
            url: "/api/cars/models"
        })
        .its("body.data").as("modelsData");

        cy.get("@brandsData").then((brands) => {
            //Get random brand
            const randomIndex = Math.floor(Math.random() * brands.length);
            const brand = brands[randomIndex];

            cy.get("@modelsData").then((models) => {
                const model = models.find(m => m.carBrandId === brand.id);
                const carRequestBody = {
                    carBrandId: brand.id,
                    carModelId: model.id,
                    mileage: faker.number.int({ min: 0, max: 999999 })
                };

                cy.api({
                    method: "POST",
                    url: "/api/cars",
                    body: carRequestBody
                }).then((carResponse) => {
                    expect(carResponse.status).to.eq(201);

                    const carId = carResponse.body.data.id;
                    const expenseRequestBody = {
                        carId: carId,
                        reportedAt: new Date().toISOString().split('T')[0],
                        mileage: Math.min(carRequestBody.mileage + 100, 999999),
                        liters: faker.number.int({ min: 1, max: 9999 }),
                        totalCost: faker.number.int({ min: 1, max: 1000000 }),
                        forceMileage: false
                    };
                    cy.api({
                        method: "POST",
                        url: "/api/expenses",
                        body: expenseRequestBody
                    }).then((expenseResponse) => {
                        expect(expenseResponse.status).to.eq(200);
                        expect(expenseResponse.body.data.carId).to.eq(expenseRequestBody.carId);
                        expect(expenseResponse.body.data.mileage).to.eq(expenseRequestBody.mileage);
                        expect(expenseResponse.body.data.liters).to.eq(expenseRequestBody.liters);
                        expect(expenseResponse.body.data.totalCost).to.eq(expenseRequestBody.totalCost);
                    });
                });
            });
        });
    });

    afterEach(() => {
        cy.removeAccount();//custom command to remove the created user account
    });
});