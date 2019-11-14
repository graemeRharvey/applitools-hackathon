/// <reference types="cypress" />

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  const version = Cypress.env('APP_VERSION')

  if (version === 2) {
    url = url.replace(/(hackathon).html/gi, "hackathonV2");
  }

  return originalFn(url, options)
})

Cypress.Commands.add('assertTrimmedTextEquals', { prevSubject: 'element' }, (subject, expectedText) => {
  cy.wrap(subject).invoke('text').then((text) => {
    expect(text.trim()).equal(expectedText)
});
})