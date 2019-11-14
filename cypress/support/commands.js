/// <reference types="cypress" />

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  const version = Cypress.env('APP_VERSION')

  if (version === 2) {
    url = url.replace(/(.html)/gi, "V2.html");
  }

  return originalFn(url, options)
})

Cypress.Commands.add('assertTrimmedTextEquals', { prevSubject: 'element' }, (subject, expectedText) => {
  cy.wrap(subject).invoke('text').then((text) => {
    expect(text.trim()).equal(expectedText)
});
})