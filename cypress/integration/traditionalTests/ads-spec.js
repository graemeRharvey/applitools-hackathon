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
  
    // Admittedly, if there aren't two GIFs, this test will fail on that assertion
    // and not run the others. BUT, if there are two, we still want to ensure that they're
    // actually visible.
    it("Renders two ads after login", () => {
        cy.get(selectors.ImgFlashSale).should('have.length', 2).each(element => {
            cy.wrap(element).should('be.visible');
        })
    });
});