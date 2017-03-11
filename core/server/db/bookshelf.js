const config = require('../config'); // non troverà nessun config.js

config.argv().env().file({file:'../config/config.json}) // imposto il path corretto per config.json
const knex = require('knex')(config.get('database'));

const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
