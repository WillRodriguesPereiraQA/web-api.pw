const { defineConfig } = require('cypress');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

async function setupPlugins(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  const bundler = createBundler({
    plugins: [createEsbuildPlugin(config)],
  });

  on('file:preprocessor', bundler);

  return config;
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents: setupPlugins,
    // Alterado: Foca apenas em arquivos .feature como specs válidas
    specPattern: ['cypress/e2e/**/*.feature', 'cypress/e2e/**/*.cy.{js,ts}'],
    // Mantemos `baseUrl` para compatibilidade, mas recomendando uso de `env.webBaseUrl` e `env.apiBaseUrl`
    baseUrl: process.env.WEB_BASE_URL || 'https://www.automationexercise.com/',
    pageLoadTimeout: 45000,
    defaultCommandTimeout: 8000,
    requestTimeout: 15000,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    env: {
      // URLs separados para web e api. Use `Cypress.env('webBaseUrl')` e `Cypress.env('apiBaseUrl')` nos testes.
      webBaseUrl: process.env.WEB_BASE_URL || 'https://www.automationexercise.com/',
      apiBaseUrl: process.env.API_BASE_URL || 'https://api.trello.com/1',
      stepDefinitions: [
        'cypress/e2e/api/**/*.{js,ts}',
        'cypress/e2e/web/**/*.{js,ts}',
        'cypress/e2e/ui/**/*.{js,ts}',
        'cypress/support/step_definitions/**/*.{js,ts}',
      ],
      omitFilteredSteps: true,
    },
  },
});
