const config = require('../config');

const knex = require('knex')(config.get('database'));

const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;