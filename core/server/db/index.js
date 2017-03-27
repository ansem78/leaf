const config = require('../config');
var db = config.get('database')
db.connection.filename = __dirname + db.connection.filename
const knex = require('knex')(db); // knex ha bisogno del path completo
const bookshelf = require('bookshelf')(knex);
module.exports = bookshelf;
