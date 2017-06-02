const bookshelf = require('../db');

const Navigation = bookshelf.Model.extend({
  tableName : 'navigation',
  hasTimestamps : true
});

module.exports = Navigation;