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

    // This is just to not have the same command copied everywhere.
    // I'd like to do this with eyes open, but adding the test name
    // likely requires adding complexity...likely unnecessarily.
    afterEach(() => {
        cy.eyesClose();
    })
  
    it("Contains all elements", () => {
        cy.eyesOpen({
            testName: 'Login Page contains all elements',
        });

        cy.eyesCheckWindow('Login page');
    });

    it("Cannot login with no user or password", () => {
        cy.eyesOpen({
            testName: 'Login Page no user or password warning',
        });
        
        cy.login('', '');
        
        cy.eyesCheckWindow({
            sizeMode: 'selector',
            selector: selectors.alertWarning
        });
    });

    it("Cannot login with valid user no password", () => {
        cy.eyesOpen({
            testName: 'Login Page valid user no password warning',
        });
        
        cy.login(validUsername, '');
        
        cy.eyesCheckWindow({
            sizeMode: 'selector',
            selector: selectors.alertWarning
        });
    });

    it("Cannot login with no user valid password", () => {
        cy.eyesOpen({
            testName: 'Login Page no user valid password warning',
        });
        
        cy.login('', validPassword);
        
        cy.eyesCheckWindow({
            sizeMode: 'selector',
            selector: selectors.alertWarning
        });
    });

    it("Can login with valid user and password", () => {
        cy.eyesOpen({
            testName: 'Login Page can login with valid user and password',
        });

        cy.login(validUsername, validPassword);

        cy.eyesCheckWindow('Logged in');
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