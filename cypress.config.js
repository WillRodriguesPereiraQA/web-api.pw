const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

async function setupPlugins(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  const bundler = createBundler({
    plugins: [createEsbuildPlugin(config)],
  });

  on("file:preprocessor", bundler);

  return config;
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents: setupPlugins,
    specPattern: "cypress/e2e/**/*.{cy.js,feature}",
    stepDefinitions: "cypress/support/step_definitions/AutomationExerciseSteps.js",
    baseUrl: "https://www.automationexercise.com/",
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 15000,
    requestTimeout: 15000,
  },
});
