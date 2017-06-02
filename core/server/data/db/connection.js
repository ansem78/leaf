var knex = require('knex'),
config = require('../../config'),
knexInstance;

function configure(dbConfig) {
    var client = dbConfig.client;

    dbConfig.debug = dbConfig.debug || false;

    if (client==='sqlite3') dbConfig.useNullAsDefault = dbConfig.useNullAsDefault || false;

    else if (client==='mysql') {
        dbConfig.connection.timezone = 'UTC';
        dbConfig.connection.charset = 'utf8mb4';
    }

    return dbConfig;
}

if (!knexInstance && config.get('database') && config.get('database:client')) knexInstance = knex(configure(config.get('database')));

module.exports = knexInstance;