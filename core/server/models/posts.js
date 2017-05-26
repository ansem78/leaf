const db = require('../db');

const Posts = db.Model.extend({
  tableName : 'posts',
  hasTimestamps : true,
  tags : function() {
    return this.belongsToMany(Tag);
  }
});

module.exports = Posts;