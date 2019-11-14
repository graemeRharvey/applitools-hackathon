/// <reference types="cypress" />

const selectors = {
    addDatasetButton: "button#addDataset",
    chart: "canvas"
  }
  
  describe("Compare Expenses Chart", () => {
    before(() => {
      cy.visit("/hackathonChart.html");
      cy.eyesOpen({
        testName: 'Compare expenses chart',
      });
    });

    after(() => {
      cy.eyesClose();
    })

    it("adds valid 2019 data", () => {
      cy.eyesCheckWindow({
        sizeMode: 'selector',
        selector: selectors.chart
      });
  
      cy.get(selectors.addDatasetButton).click();

      cy.eyesCheckWindow({
        sizeMode: 'selector',
        selector: selectors.chart
      });
    });
  });