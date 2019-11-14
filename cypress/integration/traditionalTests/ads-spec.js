/// <reference types="cypress" />

const selectors = {
    DivFlashSale1: 'div#flashSale',
    DivFlashSale2: 'div#flashSale2',
    ImgFlashSale: 'img[src$=".gif"]'
};

describe("Advertisements", () => {

    beforeEach(() => {
        cy.visit('/hackathonApp.html?showAd=true');
    });
  
    it("Renders two ads after login", () => {
        cy.get(selectors.ImgFlashSale).should('have.length', 2).each(element => {
            cy.wrap(element).should('be.visible');
        })
    });
});