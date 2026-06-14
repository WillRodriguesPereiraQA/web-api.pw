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

O arquivo **`cypress/e2e/api/trello-action-list.cy.js`** contém 6 testes que cobrem:

### ✅ Sucesso (3 testes)

1. **Retorna 200 com a ação completa**
   - Verifica se a resposta tem status 200
   - Valida se `response.body.data.list` existe
   - Confirma que `list.id` e `list.name` vêm preenchidos
   - Valida o tempo de resposta (< 3 segundos)

2. **Valida tipos de dados**
   - Confirma que `list.id` e `list.name` são strings não-vazias
   - Garante a integridade dos dados retornados

3. **Confirma o nome da lista esperada**
   - Verifica se `list.name` corresponde ao valor do fixture
   - Assegura que os dados retornados estão corretos

### ⚠️ Erro (2 testes)

4. **Retorna erro 404 para action ID inválido**
   - Tenta consultar um ID que não existe
   - Valida que a API retorna status de erro (404, 400 ou 401)

5. **Trata ID vazio corretamente**
   - Envia um ID vazio para a API
   - Confirma que a API retorna um status de erro

### ⏱️ Performance (1 teste)

6. **Responde dentro do tempo limite**
   - Verifica se a resposta chega em menos de 3 segundos
   - Garante que a API tem boa performance

---

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

## 🧹 Qualidade do código

### Scripts Disponíveis

| Script                 | Descrição                                |
| ---------------------- | ---------------------------------------- |
| `npm test`             | Executa todos os testes e gera relatório |
| `npm run test:all`     | Testes + Relatório HTML                  |
| `npm run test:run`     | Apenas executa testes (headless)         |
| `npm run test:web`     | Testes web (`.feature`) apenas           |
| `npm run test:api`     | Testes API (`.cy.js`) apenas             |
| `npm run test:watch`   | Abre Cypress interativo                  |
| `npm run lint`         | Verifica erros ESLint                    |
| `npm run lint:fix`     | Corrige erros ESLint automaticamente     |
| `npm run format`       | Formata código com Prettier              |
| `npm run format:check` | Verifica formatação sem alterar          |

### Padrões Implementados

- ✅ **ESLint**: `eslint:recommended` + `plugin:cypress/recommended` + `prettier`
- ✅ **Prettier**: Formatação automática de código
- ✅ **Commitlint**: Valida commits em formato Conventional Commits
- ✅ **Husky**: Git hooks automáticos (lint + format antes de commit)

### Pré-commit Hooks

Toda vez que você faz commit, os hooks executam automaticamente:

```bash
npm run lint:fix    # Corrige ESLint
npm run format      # Formata código
npx commitlint      # Valida mensagem de commit
```

---

## 🧹 Qualidade do código

## 🔧 Configurar URLs (web / api)

### Separação de Ambientes

O projeto segue o padrão de **separação de ambientes** usando variáveis de ambiente:

1. **Copie o arquivo de exemplo:**

   ```bash
   cp .env.example .env
   ```

2. **Configure as variáveis** no arquivo `.env`:

   ```env
   # Ambiente Web
   WEB_BASE_URL=https://www.automationexercise.com/

   # Ambiente API
   API_BASE_URL=https://api.trello.com/1
   ```

3. **Use nos testes:**
   - Testes web leem de `Cypress.env('webBaseUrl')`
   - Testes API leem de `Cypress.env('apiBaseUrl')`

### Ambientes Suportados

- **Desenvolvimento (localhost)**: Configure `.env` com URLs locais
- **Staging**: Configure com URLs de staging
- **Produção**: Configure com URLs de produção (em CI/CD, passe via secrets)

---

## 🚀 CI/CD com GitHub Actions

### Workflow Automático

O arquivo **`.github/workflows/ci.yml`** executa automaticamente:

1. **Na cada push** para `main` ou `master`
2. **Em pull requests** (PRs)

**Etapas do Pipeline:**

- ✅ **Checkout** do código
- ✅ **Setup Node.js 18+**
- ✅ **Instalação** de dependências (`npm ci`)
- ✅ **Execução** de testes (`npm run test:all`)
- ✅ **Geração** do relatório HTML
- ✅ **Upload** do artefato
- ✅ **Deploy** automático para GitHub Pages

### Acessar Relatório

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

---

## 📋 Padrões do Projeto

### 1️⃣ Separação de Ambientes

- **Variáveis de ambiente** centralizadas em `.env.example`
- **Diferentes URLs** para web, API, staging, produção
- **Sem secrets** commitados no repositório

### 2️⃣ CI/CD (GitHub Actions)

- **Workflow automático** para cada push/PR
- **Testes executados** em ambiente Ubuntu
- **Relatório HTML** publicado em GitHub Pages
- **Artifacts** salvos para download

### 3️⃣ Validações Robustas de API

- **6 testes abrangentes**: sucesso, erro, performance
- **Schema validation**: verifica estrutura de dados
- **Type validation**: confirma tipos corretos
- **Error handling**: testa 404 e IDs vazios
- **Performance check**: resposta < 3 segundos

### 4️⃣ Padronização do Projeto

- **package.json** com descrição clara, keywords, engines
- **Scripts bem organizados** (test, lint, format, etc)
- **Commits Conventional** (commitlint valida)
- **Código formatado** (Prettier + ESLint)
- **Pre-commit hooks** (Husky automático)

---

## 📚 Dependências

- **Cypress 15.17.0**: Automação de testes
- **Cucumber 24.0.1**: BDD para testes web
- **esbuild 0.28.1**: Bundler para `.feature`
- **ESLint 8.56.0**: Qualidade de código
- **Prettier 3.1.1**: Formatação automática
- **Commitlint 18.6.0**: Validação de commits
- **Husky 8.0.3**: Git hooks

---

## 🎯 Próximas Melhorias (Roadmap)

- [ ] Adicionar testes de autenticação na API
- [ ] Integrar com ferramentas de teste de carga
- [ ] Adicionar testes de performance avançados
- [ ] Implementar testes visuais (visual regression)
- [ ] Expandir cobertura de testes de web
- [ ] Integração com Slack/teams para notificações
