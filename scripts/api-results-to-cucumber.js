const fs = require('fs');
const path = require('path');

const REPORTS_DIR = path.join('cypress', 'reports');
const OUTPUT_FILE = path.join(REPORTS_DIR, 'api-cucumber-report.json');

function slug(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function mapStatus(state) {
  const statusMap = {
    passed: 'passed',
    failed: 'failed',
    pending: 'skipped',
    skipped: 'skipped',
  };

  return statusMap[state] || 'undefined';
}

function toCucumberDuration(ms) {
  return Math.round((ms || 0) * 1_000_000);
}

function isApiSpec(relativePath) {
  const normalized = relativePath.replace(/\\/g, '/');
  return normalized.includes('/api/') && normalized.endsWith('.cy.js');
}

function buildScenario(test, specUri, index) {
  const titleParts = Array.isArray(test.title) ? test.title : [test.title];
  const scenarioName = titleParts.at(-1);
  const suitePath = titleParts.slice(0, -1).join(' > ');

  return {
    description: '',
    id: `api-${index}-${slug(scenarioName)}`,
    keyword: 'Cenário',
    line: index + 1,
    name: scenarioName,
    type: 'scenario',
    steps: [
      {
        keyword: '',
        name: suitePath || scenarioName,
        match: {
          location: `${specUri}:${index + 1}`,
        },
        result: {
          status: mapStatus(test.state),
          duration: toCucumberDuration(test.duration),
        },
      },
    ],
  };
}

function buildFeatureFromRun(run) {
  const specRelative = run.spec.relative.replace(/\\/g, '/');

  if (!isApiSpec(specRelative)) {
    return null;
  }

  const tests = run.tests || [];
  if (!tests.length) {
    return null;
  }

  const firstTitle = Array.isArray(tests[0].title) ? tests[0].title : [tests[0].title];
  const featureName = firstTitle[0] || path.basename(specRelative, path.extname(specRelative));

  return {
    description: 'Testes de API executados via Cypress',
    keyword: 'Funcionalidade',
    name: featureName,
    uri: specRelative,
    id: slug(featureName),
    line: 1,
    tags: [{ name: '@api' }],
    elements: tests.map((test, index) => buildScenario(test, specRelative, index)),
  };
}

function writeApiResultsAsCucumberJson(results) {
  if (!results?.runs?.length) {
    return;
  }

  const features = results.runs.map(buildFeatureFromRun).filter(Boolean);

  fs.mkdirSync(REPORTS_DIR, { recursive: true });

  if (!features.length) {
    if (fs.existsSync(OUTPUT_FILE)) {
      fs.unlinkSync(OUTPUT_FILE);
    }
    return;
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(features, null, 2), 'utf8');
}

module.exports = { writeApiResultsAsCucumberJson };
