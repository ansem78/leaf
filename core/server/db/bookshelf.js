const config = require('../config'); // Carica il file /core/server/config/index.js che esporta l'oggetto nconf ottenuto leggendo il file config.json.

//config.argv().env().file({file:'../config/config.json}) // imposto il path corretto per config.json
const knex = require('knex')(config.get('database')); // Istanzia Knex.js passando l'oggetto con i parametri di connessione.

const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
