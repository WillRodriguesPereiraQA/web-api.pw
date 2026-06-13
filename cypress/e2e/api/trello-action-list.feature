Feature: Consulta de ação Trello
  Como consumidor da API Trello
  Quero recuperar o nome da lista associada a uma ação
  Para validar o status e exibir o nome corretamente

  Scenario: Obter o nome da lista de uma ação Trello
    Dado que uso a API do Trello para obter a ação "592f11060f95a3d3d46a987a"
    Quando envio uma requisição GET para a ação Trello
    Então devo receber o status code 200 e exibir o nome da lista
