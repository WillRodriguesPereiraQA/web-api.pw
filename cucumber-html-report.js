const fs = require('fs');
const path = require('path');
const report = require('multiple-cucumber-html-reporter');

const jsonDir = path.join('cypress', 'reports');
const reportPath = path.join(jsonDir, 'dashboard');
const jsonFiles = fs.existsSync(jsonDir)
  ? fs.readdirSync(jsonDir).filter((file) => file.endsWith('.json'))
  : [];

report.generate({
  jsonDir,
  reportPath,
  metadata: {
    browser: {
      name: 'chrome',
      version: 'latest',
    },
    device: process.env.CI ? 'GitHub Actions' : 'Local Test Machine',
    platform: {
      name: process.env.CI ? 'linux' : process.platform,
      version: process.env.CI ? 'ubuntu-latest' : process.version,
    },
  },
  customData: {
    title: 'Informações da Execução',
    data: [
      { label: 'Projeto', value: 'Automação Web e API' },
      { label: 'Ambiente', value: process.env.CYPRESS_ENV || 'dev' },
      { label: 'Arquivos JSON', value: String(jsonFiles.length) },
      { label: 'Fontes', value: jsonFiles.join(', ') || 'Nenhum' },
    ],
  },
});
