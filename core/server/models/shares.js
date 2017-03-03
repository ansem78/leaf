const db = require('../db');

const Shares = db.Model.extend({
  tableName : 'shares',
  hasTimestamps : true
});

module.exports = Shares;