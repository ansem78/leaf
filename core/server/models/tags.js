const db = require('../db');

const Tags = db.Model.extend({
  tableName : 'tags',
  hasTimestamps : true
});

module.exports = Tags;