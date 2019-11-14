/// <reference types="cypress" />

import chaiSorted from "chai-sorted"
chai.use(chaiSorted)

const selectors = {
  transactionsTable: "table#transactionsTable",
  tableHeader: function(id) { return `table#transactionsTable > thead th#${id}`}
}


describe("Recent Transactions", () => {
  before(() => {
    cy.visit("/hackathonApp.html");
  });

  it("sort in ascending order", () => {
    cy.eyesOpen({
        testName: 'Recent transactions table sorts ascending order',
    });

    cy.eyesCheckWindow({
        sizeMode: 'selector',
        selector: selectors.transactionsTable
    });

    cy.get(selectors.tableHeader("amount")).click();

    cy.eyesCheckWindow({
        sizeMode: 'selector',
        selector: selectors.transactionsTable
    });

    cy.eyesClose();
  });
});