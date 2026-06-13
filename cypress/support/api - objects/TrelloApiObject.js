export class TrelloApi {
  constructor() {
    this.baseUrl = "https://api.trello.com/1";
  }

  getAction(actionId) {
    return cy.request({
      method: "GET",
      url: `${this.baseUrl}/actions/${actionId}`,
      failOnStatusCode: false,
    });
  }
}
