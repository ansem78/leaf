const db = require('../db');
const Users = db.Model.extend({
  tableName : 'users',
  hasTimestamps : true,

  posts: function() {
    return this.hasMany(Posts);
  }
});

module.exports = Users;
