const environments = {
  dev: {
    webBaseUrl: 'https://www.automationexercise.com/',
    apiBaseUrl: 'https://api.trello.com/1',
  },
  staging: {
    webBaseUrl: 'https://www.automationexercise.com/',
    apiBaseUrl: 'https://api.trello.com/1',
  },
  production: {
    webBaseUrl: 'https://www.automationexercise.com/',
    apiBaseUrl: 'https://api.trello.com/1',
  },
  ci: {
    webBaseUrl: 'https://www.automationexercise.com/',
    apiBaseUrl: 'https://api.trello.com/1',
  },
};

function getEnvironmentConfig(envName = 'dev') {
  const profile = environments[envName] || environments.dev;

  return {
    webBaseUrl: process.env.WEB_BASE_URL || profile.webBaseUrl,
    apiBaseUrl: process.env.API_BASE_URL || profile.apiBaseUrl,
  };
}

module.exports = { environments, getEnvironmentConfig };
