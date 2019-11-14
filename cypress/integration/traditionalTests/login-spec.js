/// <reference types="cypress" />

const selectors = {
    header: 'h4.auth-header',
    alertWarning: 'div.alert-warning',
    DivFormGroup: 'div.form-group',
    InputUsername: '#username',
    InputPassword: '#password',
    BtnLogin: '#log-in',
    DivLoggedInUser: 'div.logged-user-w',
    DivLogo: 'div.logo-w',
    DivUsernameLogo: 'div.os-icon-user-male-circle',
    DivPasswordLogo: 'div.os-icon-fingerprint',
    InputRemember: 'input.form-check-input',
    LabelRemember: 'label.form-check-label',
    ImgTwitter: 'img[src$="twitter.png"]',
    ImgFacebook: 'img[src$="facebook.png"]',
    ImgLinkedIn: 'img[src$="linkedin.png"]'
};

const validUsername = 'testuser';
const validPassword = 'password';

  
describe("Login Page", () => {

    beforeEach(() => {
        cy.visit("/hackathon.html");
    });
  
    // I wouldn't typically include a test like this in my Cypress suite. This seems like a perfect candidate
    // for DOM snapshot testing. We can run that at unit test time and get quick, early feedback about any page
    // layout and content changes.
    it("Contains all elements", () => {
        cy.get(selectors.header).assertTrimmedTextEquals('Login Form');
        cy.get(selectors.DivFormGroup).eq(0).find('label').eq(0).assertTrimmedTextEquals('Username');
        cy.get(selectors.DivFormGroup).eq(1).find('label').eq(0).assertTrimmedTextEquals('Password');
        cy.get(selectors.InputUsername).invoke('attr', 'placeholder').should('equal', 'Enter your username');
        cy.get(selectors.InputPassword).invoke('attr', 'placeholder').should('equal', 'Enter your password');
        cy.get(selectors.DivUsernameLogo).should('be.visible');
        cy.get(selectors.DivPasswordLogo).should('be.visible');
        cy.get(selectors.BtnLogin).should('be.visible');
        cy.get(selectors.BtnLogin).assertTrimmedTextEquals('Log In');
        cy.get(selectors.InputRemember).should('be.visible');
        cy.get(selectors.LabelRemember).assertTrimmedTextEquals('Remember Me');
        cy.get(selectors.ImgTwitter).should('be.visible');
        cy.get(selectors.ImgFacebook).should('be.visible');
        cy.get(selectors.ImgLinkedIn).should('be.visible');
    });

    // These scenarios *could* be one data driven test, but
    // we like the idea of getting quick and clear errors regarding
    // which actual scenario failed. For example:
    // Login Page - Cannot login with no user valid password failed
    it("Cannot login with no user or password", () => {
        cy.login('', '');
        cy.get(selectors.alertWarning).assertTrimmedTextEquals('Both Username and Password must be present');
    });

    it("Cannot login with valid user no password", () => {
        cy.login(validUsername, '');
        cy.get(selectors.alertWarning).assertTrimmedTextEquals('Password must be present')
    });

    it("Cannot login with no user valid password", () => {
        cy.login('', validPassword);
        cy.get(selectors.alertWarning).assertTrimmedTextEquals('Username must be present')
    });

    it("Can login with valid user and password", () => {
        cy.login(validUsername, validPassword);
        cy.get(selectors.DivLoggedInUser).should('be.visible');
    });
});

Cypress.Commands.add('login', (username, password) => {
    if (username){
        cy.get(selectors.InputUsername).type(username);
    }
    if (password) {
        cy.get(selectors.InputPassword).type(password);
    }
    cy.get(selectors.BtnLogin).click();
})