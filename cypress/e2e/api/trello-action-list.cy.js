import { TrelloApi } from '../../support/api_objects/TrelloApiObject';
import {
  assertApiMatchesSimulatedDb,
  assertErrorResponse,
  assertRequiredFields,
  assertStringFields,
  assertSuccessResponse,
  validateApiContract,
} from '../../support/helpers/apiValidator';

const SUCCESS_CONTRACT = 'trello-action-success';
const SQL_ACTION_BY_ID =
  'SELECT action_id, list_name, status FROM trello_actions WHERE action_id = ?';

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

          validateApiContract(SUCCESS_CONTRACT, response.body);

          const actionData = response.body.data;
          assertRequiredFields(actionData, ['list']);
          assertRequiredFields(actionData.list, ['id', 'name']);
          expect(actionData.list.name).to.eq(data.expectedListName);

          if (actionData.board) {
            assertRequiredFields(actionData.board, ['id']);
            assertStringFields(actionData.board, ['id']);
          }

          cy.simulateSql(SQL_ACTION_BY_ID, [data.actionId]).then((dbResult) => {
            expect(dbResult.rowCount).to.eq(1);
            assertApiMatchesSimulatedDb(response.body, dbResult.rows[0]);
            cy.log(`Contrato AJV e SQL simulado validados para action ${data.actionId}`);
          });
        });
      });
    });

    it('should have valid data types in response', () => {
      cy.fixture('trello-action').then((data) => {
        new TrelloApi().getAction(data.actionId).then((response) => {
          assertSuccessResponse(response);
          validateApiContract(SUCCESS_CONTRACT, response.body);

          const { list } = response.body.data;
          assertStringFields(list, ['id', 'name']);
          expect(list.id).to.match(/^[a-f0-9]{24}$/i);

          cy.log('Campos obrigatórios possuem tipos válidos');
        });
      });
    });

    it('should match simulated database record via cy.task', () => {
      cy.fixture('trello-action').then((data) => {
        cy.simulateSql(SQL_ACTION_BY_ID, [data.actionId]).then((dbResult) => {
          expect(dbResult.rowCount).to.eq(1);
          expect(dbResult.rows[0].list_name).to.eq(data.expectedListName);
          expect(dbResult.rows[0].status).to.eq('active');
        });

        new TrelloApi().getAction(data.actionId).then((response) => {
          assertSuccessResponse(response);
          validateApiContract(SUCCESS_CONTRACT, response.body);

          cy.simulateSql(SQL_ACTION_BY_ID, [data.actionId]).then((dbResult) => {
            assertApiMatchesSimulatedDb(response.body, dbResult.rows[0]);
            cy.log(`API consistente com banco simulado: list_name=${dbResult.rows[0].list_name}`);
          });
        });
      });
    });

    it('should have consistent list name value', () => {
      cy.fixture('trello-action').then((data) => {
        new TrelloApi().getAction(data.actionId).then((response) => {
          assertSuccessResponse(response);
          validateApiContract(SUCCESS_CONTRACT, response.body);

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

      cy.simulateSql(SQL_ACTION_BY_ID, [invalidActionId]).then((dbResult) => {
        expect(dbResult.rowCount).to.eq(0);
      });

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
          validateApiContract(SUCCESS_CONTRACT, response.body);
          cy.log(`Tempo de resposta: ${response.duration}ms`);
        });
      });
    });
  });
});
