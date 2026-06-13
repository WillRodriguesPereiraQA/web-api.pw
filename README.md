# 🚀 Automação Web com Cypress + BDD para AutomationExercise

Este projeto automatiza o site de testes **https://www.automationexercise.com/** usando **Cypress** e **BDD/Cucumber**.

A solução final traz:
- cenários de teste em **`.feature`**
- definições de passos em **step definitions**
- objetos de página em **Page Object Model (POM)**
- configuração de **Cypress + Cucumber + esbuild** para execução correta

---

## 🌐 Site alvo

- **URL:** https://www.automationexercise.com/
- **Objetivo:** validar cadastro de usuário, busca de produtos, adição ao carrinho e checkout.

---

## 📂 Estrutura final do projeto Web

### Arquivos principais
- **`cypress/e2e/web/AutomationExercise.cy.feature`**
  - cenário BDD em português para o fluxo completo.
- **`cypress/support/step_definitions/index.js`**
  - implementa os passos `Given`, `When`, `Then` usados pelo `.feature`.
- **`cypress/pages/AutomationExercisePage.js`**
  - Page Object com locators e métodos reutilizáveis para a aplicação.
- **`cypress/e2e/web/AutomationExercise.cy.js`**
  - teste Cypress tradicional com o mesmo fluxo, usado como validação adicional.
- **`cypress.config.js`**
  - configura o Cypress para rodar `.cy.js` e `.feature`, além de registrar o Cucumber preprocessor.

---

## 🧩 Como funciona a integração BDD

1. O arquivo **`.feature`** descreve o cenário de forma legível.
2. O Cypress usa o plugin **@badeball/cypress-cucumber-preprocessor** para transformar o Gherkin em testes.
3. O arquivo **`step_definitions/index.js`** mapeia cada passo para código Cypress.
4. O Page Object separa os seletores e ações em **`cypress/pages/AutomationExercisePage.js`**.

---

## ⚙️ Como executar

### Instalar dependências
```bash
npm install
```

### Executar o cenário BDD
```bash
npx cypress run --spec "cypress/e2e/web/AutomationExercise.cy.feature"
```

### Executar o teste tradicional
```bash
npx cypress run --spec "cypress/e2e/web/AutomationExercise.cy.js"
```

### Executar em modo visual
```bash
npx cypress open
```

---

## 📌 Observações importantes

- O arquivo **`.feature`** pode ser usado como documentação e cenário de aceitação.
- Os **step definitions** devem ser mantidos em `cypress/support/step_definitions/` para o plugin localizar automaticamente.
- O Page Object melhora a manutenção dos seletores e evita duplicação de código.

---

## ✅ Status atual

- [x] Cucumber/BBD configurado para `.feature`
- [x] `step_definitions` funcionando
- [x] Page Object criado para o site Automation Exercise
- [x] Execução de teste com sucesso em `AutomationExercise.cy.feature`
- [x] Execução de teste tradicional em `AutomationExercise.cy.js`
