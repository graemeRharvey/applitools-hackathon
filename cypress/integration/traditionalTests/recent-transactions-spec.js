/// <reference types="cypress" />

import chaiSorted from "chai-sorted"
chai.use(chaiSorted)

const selectors = {
  transactionsTable: "table#transactionsTable",
  tableRow: "table#transactionsTable > tbody > tr",
  tableHeader: function(id) { return `table#transactionsTable > thead th#${id}`}
}

const startingData = [];
const amounts = [];
const updatedData = [];
describe("Recent Transactions Sorting", () => {
  before(() => {
    cy.visit("/hackathonApp.html");

    cy.get(selectors.tableRow).each(row => {
      getElementHtml(row).then(html => { startingData.push(html) });
    });

    const headersIndecies = [];
    cy.get(selectors.transactionsTable).find("th").each((columnHeader, i) => {
      headersIndecies.push({name: columnHeader.attr("id").toLowerCase(), index: i});
    });

    cy.get(selectors.tableHeader("amount")).click();

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
    });
  });

  it("sorts in ascending order", () => {
    expect(amounts).to.be.sorted({descending: false});
  });

  it("maintains row integrity", () => {
    expect(updatedData.sort()).to.deep.equal(startingData.sort());
  });
});

function getElementHtml(element) {
  return cy.wrap(element).invoke("html");
}

function parseAmountToFloat(stringAmount) {
  stringAmount = stringAmount.replace("USD", "").replace(" ", "").replace(",", "");

  return parseFloat(stringAmount);
}