const fs = require('fs');
const path = require('path');

const DB_FIXTURE_PATH = path.join(__dirname, '../fixtures/simulated-db/trello-actions.json');

function loadDatabase() {
  const raw = fs.readFileSync(DB_FIXTURE_PATH, 'utf8');
  return JSON.parse(raw);
}

function normalizeQuery(query) {
  return query.replace(/\s+/g, ' ').trim();
}

function parseSelectColumns(selectClause) {
  const columns = selectClause
    .split(',')
    .map((column) => column.trim().toLowerCase())
    .filter(Boolean);

  return columns.length ? columns : ['*'];
}

function projectRow(record, columns) {
  if (columns.includes('*')) {
    return { ...record };
  }

  return columns.reduce((projected, column) => {
    if (Object.prototype.hasOwnProperty.call(record, column)) {
      projected[column] = record[column];
    }
    return projected;
  }, {});
}

function simulateSql({ query, params = [] }) {
  const normalizedQuery = normalizeQuery(query);
  const actionByIdPattern = /^SELECT (.+?) FROM trello_actions WHERE action_id = \?$/i;
  const match = normalizedQuery.match(actionByIdPattern);

  if (!match) {
    throw new Error(
      `SQL simulado não suportado. Use: SELECT <colunas> FROM trello_actions WHERE action_id = ?`
    );
  }

  const columns = parseSelectColumns(match[1]);
  const actionId = params[0];
  const database = loadDatabase();
  const record = database.trello_actions.find((row) => row.action_id === actionId);
  const rows = record ? [projectRow(record, columns)] : [];

  return {
    query: normalizedQuery,
    params,
    rowCount: rows.length,
    rows,
  };
}

function registerSimulatedDbTasks(on) {
  on('task', {
    simulateSql,
  });
}

module.exports = {
  loadDatabase,
  registerSimulatedDbTasks,
  simulateSql,
};
