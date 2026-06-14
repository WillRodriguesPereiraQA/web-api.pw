require('dotenv').config();

const { defineConfig } = require('cypress');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const { getEnvironmentConfig } = require('./cypress/config/environments');

const environmentName = process.env.CYPRESS_ENV || 'dev';
const { webBaseUrl, apiBaseUrl } = getEnvironmentConfig(environmentName);

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
    specPattern: ['cypress/e2e/**/*.feature', 'cypress/e2e/**/*.cy.{js,ts}'],
    baseUrl: webBaseUrl,
    pageLoadTimeout: 45000,
    defaultCommandTimeout: 8000,
    requestTimeout: 15000,
    retries: {
      runMode: process.env.CI ? 2 : 1,
      openMode: 0,
    },
    env: {
      environment: environmentName,
      webBaseUrl,
      apiBaseUrl,
      trelloApiKey: process.env.TRELLO_API_KEY,
      trelloApiToken: process.env.TRELLO_API_TOKEN,
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
