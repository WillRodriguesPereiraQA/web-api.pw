# 🚀 Automação Web e API com Cypress + BDD

Este projeto automatiza testes **web** e **API** usando **Cypress** e **BDD/Cucumber**.

A solução traz:
- cenários web em **`.feature`** no **`cypress/e2e/web/`**
- cenários API em **`.feature`** no **`cypress/e2e/api/`**
- definições de passos em **`cypress/support/step_definitions/`**
- Page Object (POM) em **`cypress/support/pages/AutomationExercisePage.js`**
- API object em **`cypress/support/api - objects/TrelloApiObject.js`**
- configuração de **Cypress + Cucumber + esbuild** no **`cypress.config.js`**

---

## 🎯 Escopo dos testes

### Web — Automation Exercise
- **URL:** https://www.automationexercise.com/
- **Objetivo:** validar cadastro de usuário, busca de produtos, adição ao carrinho e checkout.

### API — Trello
- **URL base:** https://api.trello.com/1
- **Objetivo:** consultar uma ação Trello e validar o `list.name` retornado.

---

## 📂 Estrutura do projeto

### Arquivos principais
- **`cypress/e2e/web/AutomationExercise.cy.feature`**
  - cenário BDD em português para o fluxo completo do site Automation Exercise.
- **`cypress/e2e/api/trello-action-list.feature`**
  - cenário BDD para consulta à API Trello e validação do `list.name`.
- **`cypress/support/step_definitions/AutomationExerciseSteps.js`**
  - implementa os passos web `Dado`, `Quando`, `Então` usados pelo `.feature`.
- **`cypress/support/step_definitions/TrelloSteps.js`**
  - implementa os passos API `Dado`, `Quando`, `Então` usados pelo `.feature`.
- **`cypress/support/pages/AutomationExercisePage.js`**
  - Page Object com locators e métodos reutilizáveis para a aplicação web.
- **`cypress/support/api - objects/TrelloApiObject.js`**
  - API object para enviar requisições Trello.
- **`cypress/fixtures/trello-action.json`**
  - fixture com dados de teste para o fluxo Trello.
- **`cypress.config.js`**
  - configura o Cypress para rodar `.feature` e registrar o Cucumber preprocessor.

---

## 🧩 Como funciona a integração BDD

1. O arquivo **`.feature`** descreve o cenário de forma legível.
2. O Cypress usa o plugin **@badeball/cypress-cucumber-preprocessor** para transformar o Gherkin em testes.
3. Os arquivos em **`cypress/support/step_definitions/`** mapeiam cada passo para código Cypress:
   - **`AutomationExerciseSteps.js`** — passos web
   - **`TrelloSteps.js`** — passos API
4. O Page Object separa os seletores e ações em **`cypress/support/pages/AutomationExercisePage.js`**.
5. O API object encapsula as requisições em **`cypress/support/api - objects/TrelloApiObject.js`**.

---

## ⚙️ Como executar

### Instalar dependências
```bash
npm install
```

### Executar o cenário BDD web
```bash
npx cypress run --spec "cypress/e2e/web/AutomationExercise.cy.feature"
```

### Executar o cenário BDD API
```bash
npx cypress run --spec "cypress/e2e/api/trello-action-list.feature"
```

### Executar web e API juntos e Gerar Relatórios 
```bash
npm run test:all
```

### Ver o resultado 
O relatório será criado na pasta `cypress/reports/dashboard`. Basta abrir o arquivo **`index.html`**

---


## ✅ Status atual

- [x] BDD/Cucumber configurado para `.feature`
- [x] `step_definitions` funcionando para web e API
- [x] Page Object criado para o site Automation Exercise
- [x] API object criado para consulta a Trello
- [x] Fixture criado para o teste Trello
- [x] Execução de teste com sucesso em `AutomationExercise.cy.feature`
- [x] Execução de teste com sucesso em `trello-action-list.feature`

### Evidências
<img width="1776" height="962" alt="Captura de tela 2026-06-13 105047" src="https://github.com/user-attachments/assets/a3628503-faed-4e63-9653-d6fa7caf9ebd" />
<img width="1895" height="870" alt="Captura de tela 2026-06-13 105027" src="https://github.com/user-attachments/assets/4580e643-925a-4387-b702-7d58edb5f4d7" />
