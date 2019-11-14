const selectors = {
    header: 'h4.auth-header',
    alertWarning: 'div.alert-warning',
    InputUsername: '#username',
    InputPassword: '#password',
    BtnLogin: '#log-in',
    DivLoggedInUser: 'div.logged-user-w'
};

const validUsername = 'testuser';
const validPassword = 'password';

  
describe("Login Page", () => {
    before(() => {});
  
    beforeEach(() => {
        cy.visit("/hackathon.html");
    });
  
    it("Contains all elements", () => {
    });

    it("Cannot login with no user or password", () => {
        cy.login('', '');
        cy.get(selectors.alertWarning).invoke('text').then((text) => {
            expect(text.trim()).equal('Both Username and Password must be present')
        });
    });

    it("Cannot login with valid user no password", () => {
        cy.login(validUsername, '');
        cy.get(selectors.alertWarning).invoke('text').then((text) => {
            expect(text.trim()).equal('Password must be present')
        });
    });

    it("Cannot login with no user valid password", () => {
        cy.login('', validUsername);
        cy.get(selectors.alertWarning).invoke('text').then((text) => {
            expect(text.trim()).equal('Username must be present')
        });
    });

    it("Can login with valid user and password", () => {
        cy.login(validUsername, validUsername);
        cy.get(selectors.DivLoggedInUser).should('be.visible');
    });
});

Cypress.Commands.add('login', (username, password, options = {}) => {
    if (username){
        cy.get(selectors.InputUsername).type(username);
    }
    if (password) {
        cy.get(selectors.InputPassword).type(password);
    }
    cy.get(selectors.BtnLogin).click();
})