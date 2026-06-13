import { Given as Dado, When as Quando, Then as Entao } from "@badeball/cypress-cucumber-preprocessor";
import { TrelloApi } from "../api - objects/TrelloApiObject";

let trelloResponse;
let trelloData;

Dado("que uso a API do Trello para obter a ação {string}", (actionId) => {
  cy.fixture("trello-action").then((data) => {
    trelloData = data;
    trelloData.actionId = actionId || trelloData.actionId;
  });
});

Quando("envio uma requisição GET para a ação Trello", () => {
  cy.then(() => {
    return new TrelloApi().getAction(trelloData.actionId).then((response) => {
      trelloResponse = response;
    });
  });
});

Entao("devo receber o status code {int} e exibir o nome da lista", (expectedStatus) => {
  expect(trelloResponse.status).to.eq(expectedStatus);
  expect(trelloResponse.body.data.list).to.have.property("name");
  cy.log(`Nome da lista: ${trelloResponse.body.data.list.name}`);
  expect(trelloResponse.body.data.list.name).to.equal(trelloData.expectedListName);
});
