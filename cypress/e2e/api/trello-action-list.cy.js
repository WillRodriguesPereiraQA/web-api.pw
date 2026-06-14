import { TrelloApi } from '../../support/api_objects/TrelloApiObject';
import {
  assertErrorResponse,
  assertRequiredFields,
  assertStringFields,
  assertSuccessResponse,
  validateJsonSchema,
} from '../../support/helpers/apiValidator';
import trelloActionSchema from '../../support/schemas/trello-action.schema.json';

describe('Trello Action API', () => {
  const MAX_RESPONSE_TIME = 3000;

  beforeEach(() => {
    cy.log(`Ambiente: ${Cypress.env('environment')} | API: ${Cypress.env('apiBaseUrl')}`);
  });

  describe('GET /actions/{actionId} - Sucesso', () => {
    it('should return 200 with complete action object', () => {
      cy.fixture('trello-action').then((data) => {
        new TrelloApi().getAction(data.actionId).then((response) => {
          assertSuccessResponse(response, {
            expectedStatus: 200,
            maxDurationMs: MAX_RESPONSE_TIME,
          });

          validateJsonSchema(trelloActionSchema, response.body);

          const actionData = response.body.data;
          assertRequiredFields(actionData, ['list']);
          assertRequiredFields(actionData.list, ['id', 'name']);
          expect(actionData.list.name).to.eq(data.expectedListName);

          if (actionData.board) {
            assertRequiredFields(actionData.board, ['id']);
            assertStringFields(actionData.board, ['id']);
          }

          cy.log(`Lista encontrada: ${actionData.list.name}`);
        });
      });
    });

    it('should have valid data types in response', () => {
      cy.fixture('trello-action').then((data) => {
        new TrelloApi().getAction(data.actionId).then((response) => {
          assertSuccessResponse(response);

          const { list } = response.body.data;
          assertStringFields(list, ['id', 'name']);
          expect(list.id).to.match(/^[a-f0-9]{24}$/i);

          cy.log('Campos obrigatórios possuem tipos válidos');
        });
      });
    });

    it('should have consistent list name value', () => {
      cy.fixture('trello-action').then((data) => {
        new TrelloApi().getAction(data.actionId).then((response) => {
          assertSuccessResponse(response);

          const { list } = response.body.data;
          expect(list.name).to.equal(data.expectedListName);
          expect(list.id).to.not.be.empty;

          cy.log(`Lista validada: ID=${list.id}, Nome=${list.name}`);
        });
      });
    });
  });

  describe('GET /actions/{actionId} - Erro', () => {
    it('should return 404 for non-existent action', () => {
      const invalidActionId = 'invalid_action_id_12345';

      new TrelloApi().getAction(invalidActionId).then((response) => {
        assertErrorResponse(response, { allowedStatuses: [400, 401, 404] });
        cy.log(`Status de erro recebido: ${response.status}`);
      });
    });

    it('should handle empty action ID gracefully', () => {
      new TrelloApi().getAction('').then((response) => {
        assertErrorResponse(response, { minStatus: 400 });
        cy.log(`ID vazio tratado: ${response.status}`);
      });
    });

    it('should reject malformed action ID', () => {
      new TrelloApi().getAction('not-a-valid-object-id').then((response) => {
        assertErrorResponse(response, { allowedStatuses: [400, 401, 404] });
        cy.log(`ID malformado tratado: ${response.status}`);
      });
    });
  });

  describe('GET /actions/{actionId} - Performance', () => {
    it('should respond within acceptable time limit', () => {
      cy.fixture('trello-action').then((data) => {
        new TrelloApi().getAction(data.actionId).then((response) => {
          assertSuccessResponse(response, { maxDurationMs: MAX_RESPONSE_TIME });
          cy.log(`Tempo de resposta: ${response.duration}ms`);
        });
      });
    });
  });
});
