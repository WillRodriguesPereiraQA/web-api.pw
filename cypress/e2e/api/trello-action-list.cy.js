import { TrelloApi } from '../../support/api_objects/TrelloApiObject';

describe('Trello Action API', () => {
  it('should return the list name for a Trello action', () => {
    cy.fixture('trello-action').then((data) => {
      new TrelloApi().getAction(data.actionId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('data');
        expect(response.body.data.list).to.have.property('name', data.expectedListName);
        cy.log(`Nome da lista: ${response.body.data.list.name}`);
      });
    });
  });
});
