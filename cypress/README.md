# 🚀 Projeto de Automação Híbrido (UI e API) com Cypress e BDD

Este projeto é um modelo para testar tanto as telas de um sistema (UI) quanto as rotas de bastidores (API) usando a mesma ferramenta: o **Cypress**. Para facilitar a leitura dos testes, usamos o formato **BDD (Cucumber)**, que permite escrever os cenários em português (Dado, Quando, Então).

---

## 📂 Estrutura de Pastas

O projeto está dividido de forma organizada para separar o que é teste de tela e o que é teste de API:

*   **`cypress/e2e/ui/`**: Guarda os testes das telas do sistema (ex: Login, Cadastro).
*   **`cypress/e2e/api/`**: Guarda os testes das rotas da API (ex: Criar usuário).
*   **`cypress/fixtures/`**: Guarda arquivos de dados em formato JSON (massa de dados fixa).
*   **`cypress/support/`**: Guarda comandos criados por você para reaproveitar nos testes.

---

## ❓ Arquivos criados automaticamente (Template Spec)

Ao usar o comando `npx cypress open` e criar uma nova "Spec", o Cypress gera um código padrão de exemplo (com `describe` e `it`). 

**O que fazer:**
1. Esse código serve apenas para testar se o Cypress está abrindo o navegador.
2. Como usamos **BDD/Cucumber**, você deve **apagar** esse código automático.
3. No lugar dele, cole os seus passos de teste (**Step Definitions**) usando `Given`, `When` e `Then`.

---

## 🛠️ Como Instalar e Rodar o Projeto

Se você acabou de baixar este projeto na sua máquina, siga os passos abaixo no terminal:

### 1. Instalar as dependências
Este comando baixa o Cypress e o Cucumber para o seu computador:
```bash
npm install
```

### 2. Abrir a tela visual do Cypress
Use este comando para abrir o painel do Cypress e escolher qual teste quer ver rodando na tela:
```bash
npx cypress open
```

### 3. Rodar os testes em modo "Fantasma" (Sem abrir navegador)
Use este comando para rodar todos os testes direto no terminal de forma rápida:
```bash
npx cypress run
```

---

## 📝 Checklist de Comandos Executados

Aqui está a lista de tudo o que foi feito para criar este framework:

### Estrutura Base do Cypress
- [x] `mkdir meu-projeto-cypress` -> Criou a pasta do projeto.
- [x] `cd meu-projeto-cypress` -> Entrou na pasta.
- [x] `npm init -y` -> Iniciou o projeto Node.js.
- [x] `npm install cypress --save-dev` -> Instalou o Cypress.
- [x] `npx cypress open` -> Criou as pastas automáticas.

### Instalação do BDD / Cucumber
- [x] `npm install @badeball/cypress-cucumber-preprocessor @bahmutov/cypress-esbuild-preprocessor esbuild --save-dev` -> Instalou o tradutor de BDD.
