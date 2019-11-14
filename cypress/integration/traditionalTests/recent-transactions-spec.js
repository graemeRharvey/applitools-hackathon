/// <reference types="cypress" />

import chaiSorted from "chai-sorted"
chai.use(chaiSorted)

const selectors = {
  transactionsTable: "table#transactionsTable",
  tableRow: "table#transactionsTable > tbody > tr",
  tableHeader: function(id) { return `table#transactionsTable > thead th#${id}`}
}

const headersIndecies = [];

const startingData = [];

describe("Recent Transactions", () => {
  before(() => {
    cy.visit("/hackathonApp.html");

    cy.get(selectors.tableRow).each(row => {
      getElementHtml(row).then(html => { startingData.push(html) });
    });

    cy.get(selectors.transactionsTable).find("th").each((columnHeader, i) => {
      headersIndecies.push({name: columnHeader.attr("id").toLowerCase(), index: i});
    });
  });

  it("sort in ascending order", () => {
    cy.get(selectors.tableHeader("amount")).click();

    let amounts = [];
    let updatedData = [];
    /* There's a lot of code here that would be easily cleaned up if we had access
     to the app source code to add some useful ids.
     For example, the amount fields could have an attribute added to make them
     easier to locate. This whole section would become something simpler like:

     cy.get(selectors.amountField).each(field => {
        cy.wrap(field).invoke("text").each(amount => {
          amounts.push(parseAmountToFloat(text));
        });
     });
    */
    cy.get(selectors.tableRow).each(row => {
      const amountIndex = headersIndecies.find(h => h.name === "amount").index;
      cy.wrap(row).find("td").eq(amountIndex).find("span").invoke("text").then(text => {
        amounts.push(parseAmountToFloat(text));
      });

      getElementHtml(row).then(html => {updatedData.push(html)});
    }).then(() => {
      expect(amounts).to.be.sorted({descending: false});
      expect(updatedData.sort()).to.deep.equal(startingData.sort());
    });
  });
});

function getElementHtml(element) {
  return cy.wrap(element).invoke("html");
}

function parseAmountToFloat(stringAmount) {
  stringAmount = stringAmount.replace("USD", "").replace(" ", "").replace(",", "");

  return parseFloat(stringAmount);
}