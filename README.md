# 🚀 Automação Web e API com Cypress + BDD

Este projeto automatiza testes **web** e **API** usando **Cypress**.

A solução traz:

- cenários web em **`.feature`** no **`cypress/e2e/web/`** (BDD/Cucumber)
- testes de API como specs Cypress diretas em **`cypress/e2e/api/*.cy.js`**
- Page Object (POM) em **`cypress/support/pages/AutomationExercisePage.js`**
- API object em **`cypress/support/api_objects/TrelloApiObject.js`**
- configuração de **Cypress + esbuild** em **`cypress.config.js`**
- workflow do **GitHub Actions** para rodar os testes, gerar o relatório e publicar no Pages.

---

## 🎯 Escopo dos testes

### Web — Automation Exercise

- **URL:** https://www.automationexercise.com/
- **Objetivo:** validar cadastro de usuário, busca de produtos, adição ao carrinho e checkout.

### API — Trello

- **URL base:** https://api.trello.com/1
- **Objetivo:** testar a consulta de uma ação Trello com validação de schema, dados, erros e performance.

---

## 📂 Estrutura do projeto

### Arquivos principais

- cenário BDD em português para o fluxo completo do site Automation Exercise.
- Page Object com locators e métodos reutilizáveis para a aplicação web.
- API object para enviar requisições Trello.
- fixture com dados de teste para o fluxo Trello.
- configura o Cypress para rodar `.feature` e registrar o Cucumber preprocessor.

---

## 🧩 Como funciona a integração BDD

1. O arquivo **`.feature`** descreve o cenário de forma legível.
2. Os arquivos em **`cypress/support/step_definitions/`** mapeiam cada passo para código Cypress:
   - **`TrelloSteps.js`** — passos API
3. O API object encapsula as requisições em **`cypress/support/api - objects/TrelloApiObject.js`**.

---

## 🧪 Cenários de teste da API Trello

O arquivo **`cypress/e2e/api/trello-action-list.cy.js`** contém **8 testes** que cobrem:

### ✅ Sucesso (4 testes)

1. **Retorna 200 com a ação completa**
   - Verifica status 200 e estrutura da resposta
   - Valida o **contrato JSON (AJV)**
   - Cruza os dados com o **SQL simulado** via `cy.task`

2. **Valida tipos de dados**
   - Confirma tipos corretos em `list.id` e `list.name`
   - Valida o contrato AJV da resposta

3. **Confere registro no banco simulado**
   - Executa SQL simulado com `cy.simulateSql()`
   - Compara o retorno da API com o que o "banco" retornaria

4. **Confirma o nome da lista esperada**
   - Verifica se `list.name` bate com o fixture e o contrato

### ⚠️ Erro (3 testes)

5. **Retorna erro para action ID inválido**
   - SQL simulado retorna zero registros
   - API retorna status de erro (400, 401 ou 404)

6. **Trata ID vazio corretamente**
   - Confirma que a API retorna status de erro

7. **Rejeita ID malformado**
   - Confirma que a API trata ID inválido com erro

### ⏱️ Performance (1 teste)

8. **Responde dentro do tempo limite**
   - Verifica resposta em menos de 3 segundos
   - Valida o contrato AJV da resposta

---

## 📋 Validação de contrato (AJV)

- A função **`validateApiContract()`** em **`cypress/support/helpers/apiValidator.js`** valida a presença dos campos obrigatórios (`data`, `list`, `id`, `name`) na estrutura da resposta da API contra o **contrato JSON `cypress/support/schemas/trello-action.schema.json`**

---

## 🗄️ SQL

Criei uma `cy.task`, com um **SQL simulado** usando **`cy.simulateSql`** para validar se a API retorna o que o banco teria armazenado

```sql
SELECT action_id, list_name, status FROM trello_actions WHERE action_id = ?
```

## ⚙️ Como executar

### Instalar dependências

```bash
npm install
```

### Executar o cenário BDD web

```bash
npx cypress run --spec "cypress/e2e/web/AutomationExercise.cy.feature"
```

### Executar o teste API (spec Cypress)

```bash
npx cypress run --spec "cypress/e2e/api/trello-action-list.cy.js"
```

### Executar web e API juntos e Gerar Relatórios

```bash
npm run test:all
```

### Ver o resultado

O relatório será criado na pasta `cypress/reports/dashboard`. Basta abrir o arquivo **`index.html`**

---

### Separação de Ambientes

O projeto segue o padrão de **separação de ambientes** usando variáveis de ambiente:

**Configurção das variáveis** no arquivo `.env`:

```env
# Ambiente Web
WEB_BASE_URL=https://www.automationexercise.com/

# Ambiente API
API_BASE_URL=https://api.trello.com/1
```

- Testes web leem de `Cypress.env('webBaseUrl')`
- Testes API leem de `Cypress.env('apiBaseUrl')`

### Ambientes Suportados

- **Desenvolvimento (localhost)**: Configure `.env` com URLs locais
- **Staging**: Configure com URLs de staging
- **Produção**: Configure com URLs de produção (em CI/CD, passe via secrets)

---

## 🚀 CI/CD com GitHub Actions

### Workflow Automático

**`.github/workflows/ci.yml`**

O relatório é publicado automaticamente no **GitHub Pages**:

- URL: `https://WillRodriguesPereiraQA.github.io/web-api.cy/`

---

## 🔧 Configurar URLs (web / api)

## ✅ Status atual

- [x] BDD/Cucumber configurado para os cenários web em `.feature`
- [x] Tests de API convertidos para specs Cypress diretas em `cypress/e2e/api/`
- [x] Page Object criado para o site Automation Exercise
- [x] API object criado para consulta a Trello
- [x] Fixture criado para o teste Trello
- [x] Execução de teste web com sucesso em `AutomationExercise.feature`
- [x] Execução de teste API com sucesso em `trello-action-list.cy.js`
- [x] Validação de contrato JSON com AJV
- [x] SQL simulado via `cy.task` para cruzar API com banco simulado

---

## Evidências

<img width="1888" height="950" alt="Captura de tela 2026-06-14 174936" src="https://github.com/user-attachments/assets/9cabb40b-a0dd-41f7-a5b2-704c1eb4fcd6" />
<img width="1892" height="865" alt="Captura de tela 2026-06-14 175123" src="https://github.com/user-attachments/assets/b457405c-a14c-4b86-98f9-ca1ab805519c" />
