const db = require('../db');

const Settings = db.Model.extend({
  tableName : 'settings',
  hasTimestamps : true
});

module.exports = Settings;