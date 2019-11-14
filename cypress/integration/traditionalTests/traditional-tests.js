const selectors = {};

  
describe("Login Page", () => {
    before(() => {});
  
    beforeEach(() => {});
  
    it.only("Contains all elements", () => {
        cy.visit("/hackathon.html");
    });

    it("Cannot login with no user or password", () => {});

    it("Cannot login with valid user no password", () => {});

    it("Cannot login with valid user no password", () => {});

    it("Can login with valid user and password", () => {});
});

describe("Recent Transactions", () => {
    // To skip login, visit: https://demo.applitools.com/hackathonApp.html OR https://demo.applitools.com/hackathonAppV2.html
    before(() => {});
  
    beforeEach(() => {});
  
    it("Can sort ascending", () => {});
});

describe("Compare Expenses", () => {
    before(() => {});
  
    beforeEach(() => {});
  
    it("Renders chart correctly", () => {});

    it("Can show data for next year", () => {});
});

describe("Advertisements", () => {
    before(() => {
        // Visit: /hackathon.html?showAd=true OR /hackathonV2.html?showAd=true
    });
  
    beforeEach(() => {});
  
    it("Renders two ads after login", () => {});
});
