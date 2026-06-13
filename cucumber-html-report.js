const report = require('multiple-cucumber-html-reporter');

report.generate({
    jsonDir: 'cypress/reports', // Onde o Cypress vai salvar o JSON
    reportPath: 'cypress/reports/dashboard', // Onde ele vai criar o relatório bonito
    metadata: {
        browser: {
            name: 'chrome',
            version: 'latest'
        },
        device: 'Local Test Machine',
        platform: {
            name: 'windows',
            version: '10'
        }
    },
    customData: {
        title: 'Informações da Execução',
        data: [
            { label: 'Projeto', value: 'Automação Web e API' },
            { label: 'Sprint', value: '01' }
        ]
    }
});
