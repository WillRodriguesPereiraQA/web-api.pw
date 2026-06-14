export class TrelloApi {
  constructor() {
    this.baseUrl = Cypress.env('apiBaseUrl');
    this.apiKey = Cypress.env('trelloApiKey');
    this.apiToken = Cypress.env('trelloApiToken');
  }

  buildQueryParams(extraParams = {}) {
    const params = { ...extraParams };

    if (this.apiKey) {
      params.key = this.apiKey;
    }

    if (this.apiToken) {
      params.token = this.apiToken;
    }

    return params;
  }

  getAction(actionId) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}/actions/${actionId}`,
      qs: this.buildQueryParams(),
      failOnStatusCode: false,
    });
  }
}
