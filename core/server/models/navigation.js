const db = require('../db');

const Navigation = db.Model.extend({
  tableName : 'navigation',
  hasTimestamps : true
});

module.exports = Navigation;