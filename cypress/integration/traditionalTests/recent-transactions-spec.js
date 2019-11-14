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

function getElementHtml(element) {
  return cy.wrap(element).invoke("html");
}

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
    let sortedData = [];
    // There's a lot of code here that would be easily cleaned up if we had access
    // to the app source code to add some useful ids.
    // For example, the amount fields could have an attribute added to make them
    // easier to locate. It would become something simpler like cy.get(selectors.amountField).
    cy.get(selectors.tableRow).each(row => {
      const amountIndex = headersIndecies.find(h => h.name === "amount").index;
      cy.wrap(row).find("td").eq(amountIndex).find("span").invoke("text").then(text => {
        text = text.replace("USD", "").replace(" ", "").replace(",", "");

        amounts.push(parseFloat(text));
      })

      getElementHtml(row).then(html => {sortedData.push(html)});
    }).then(() => {
      expect(amounts).to.be.sorted({descending: false});
      expect(sortedData.sort()).to.deep.equal(startingData.sort());
    });
  });
});
