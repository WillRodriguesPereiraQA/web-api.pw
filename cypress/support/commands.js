const MAX_VISIT_RETRIES = 3;
const RETRY_DELAY_MS = 5000;
const HOME_READY_SELECTOR = 'a[href="/login"]';

Cypress.Commands.add('visitAutomationExercise', (url) => {
  const target = url || Cypress.env('webBaseUrl') || Cypress.config('baseUrl');

  cy.intercept({ resourceType: /font|media/ }, { statusCode: 204, body: '' });

  const visitWithRetry = (attempt = 1) => {
    cy.request({
      url: target,
      failOnStatusCode: false,
      timeout: 60000,
    }).then((response) => {
      if (response.status >= 500 && attempt < MAX_VISIT_RETRIES) {
        cy.log(
          `Site returned HTTP ${response.status}. Retrying (${attempt}/${MAX_VISIT_RETRIES - 1})...`
        );
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(RETRY_DELAY_MS);
        visitWithRetry(attempt + 1);
        return;
      }

      cy.visit(target, {
        timeout: 180000,
        failOnStatusCode: false,
      });

      cy.get('body', { timeout: 30000 }).should('be.visible');

      cy.get('body').then(($body) => {
        const pageReady = $body.find(HOME_READY_SELECTOR).length > 0;

        if (!pageReady && attempt < MAX_VISIT_RETRIES) {
          cy.log(`Home page not ready. Retrying visit (${attempt}/${MAX_VISIT_RETRIES - 1})...`);
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(RETRY_DELAY_MS);
          visitWithRetry(attempt + 1);
          return;
        }

        cy.get(HOME_READY_SELECTOR, { timeout: 30000 }).should('be.visible');
      });
    });
  };

  visitWithRetry();
});
