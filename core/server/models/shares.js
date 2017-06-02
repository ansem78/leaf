const bookshelf = require('../db');

const Shares = bookshelf.Model.extend({
  tableName : 'shares',
  hasTimestamps : true
});

module.exports = Shares;