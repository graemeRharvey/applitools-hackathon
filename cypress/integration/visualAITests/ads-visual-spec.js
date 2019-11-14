/// <reference types="cypress" />

describe("Advertisements", () => {

    beforeEach(() => {
        cy.visit('/hackathonApp.html?showAd=true');
    });

    afterEach(() => {
        cy.eyesClose();
    })
  
    it("Renders two ads after login", () => {
        cy.eyesOpen({
            testName: 'Advertisements render two ads after login',
        });

        cy.eyesCheckWindow('Logged in page');
    });
});