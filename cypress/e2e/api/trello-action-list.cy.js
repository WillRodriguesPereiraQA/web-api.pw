import { TrelloApi } from '../../support/api_objects/TrelloApiObject';

describe('Trello Action API', () => {
  const MAX_RESPONSE_TIME = 3000; // 3 segundos

  describe('GET /actions/{actionId} - Sucesso', () => {
    it('should return 200 with complete action object', () => {
      cy.fixture('trello-action').then((data) => {
        const startTime = Date.now();

        new TrelloApi().getAction(data.actionId).then((response) => {
          const responseTime = Date.now() - startTime;

          // Status code
          expect(response.status).to.eq(200);

          // Response time validation
          expect(responseTime).to.be.lessThan(MAX_RESPONSE_TIME);
          cy.log(`Tempo de resposta: ${responseTime}ms`);

          // Required top-level fields
          expect(response.body).to.have.property('data');
          const actionData = response.body.data;

          expect(actionData).to.be.an('object');

          // List object validation (required fields from Trello API)
          expect(actionData).to.have.property('list').and.be.an('object');
          expect(actionData.list).to.have.property('id').and.be.a('string');
          expect(actionData.list).to.have.property('name').and.be.a('string');
          expect(actionData.list.name).to.eq(data.expectedListName);

          // Board object validation (if present)
          if (actionData.board) {
            expect(actionData.board).to.be.an('object');
            expect(actionData.board).to.have.property('id').and.be.a('string');
          }

          cy.log(`✓ Lista encontrada: ${actionData.list.name}`);
        });
      });
    });

    it('should have valid data types in response', () => {
      cy.fixture('trello-action').then((data) => {
        new TrelloApi().getAction(data.actionId).then((response) => {
          const actionData = response.body.data;

          // Validate required list fields exist and have correct types
          expect(actionData.list).to.exist;
          expect(actionData.list.id).to.be.a('string').and.not.empty;
          expect(actionData.list.name).to.be.a('string').and.not.empty;

          cy.log('✓ Todos os campos obrigatórios possuem tipos válidos');
        });
      });
    });

    it('should have consistent list name value', () => {
      cy.fixture('trello-action').then((data) => {
        new TrelloApi().getAction(data.actionId).then((response) => {
          const actionData = response.body.data;

          // Validate list name matches expected value
          expect(actionData.list.name).to.equal(data.expectedListName);
          expect(actionData.list.id).to.not.be.empty;

          cy.log(`✓ Lista validada: ID=${actionData.list.id}, Nome=${actionData.list.name}`);
        });
      });
    });
  });

  describe('GET /actions/{actionId} - Erro', () => {
    it('should return 404 for non-existent action', () => {
      const invalidActionId = 'invalid_action_id_12345';

      new TrelloApi().getAction(invalidActionId).then((response) => {
        // Trello API typically returns 404 or error status for invalid IDs
        expect(response.status).to.be.oneOf([404, 400, 401]);
        cy.log(`✓ Status de erro apropriado recebido: ${response.status}`);
      });
    });

    it('should handle empty action ID gracefully', () => {
      new TrelloApi().getAction('').then((response) => {
        // Should return an error status
        expect(response.status).to.be.at.least(400);
        cy.log(`✓ ID vazio tratado: ${response.status}`);
      });
    });
  });

  describe('GET /actions/{actionId} - Performance', () => {
    it('should respond within acceptable time limit', () => {
      cy.fixture('trello-action').then((data) => {
        const startTime = Date.now();

        new TrelloApi().getAction(data.actionId).then(() => {
          const responseTime = Date.now() - startTime;
          expect(responseTime).to.be.lessThan(MAX_RESPONSE_TIME);
          cy.log(`✓ Tempo de resposta: ${responseTime}ms`);
        });
      });
    });
  });
});
