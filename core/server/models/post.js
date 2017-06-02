var leafBookshelf = require('./base'),

Post,
Posts;

Post = leafBookshelf.Model.extend({

  tableName : 'posts',

  tags : function() {
    return this.belongsToMany('Tag','post_id');
  }



});

Posts = leafBookshelf.Collection.extend({
  model : Post
});

module.exports = {
  Post : leafBookshelf.model('Post',Post),
  Posts : leafBookshelf.collection('Posts',Posts)
};