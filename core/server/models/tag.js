var leafBookshelf = require('./base'),

Tag,
Tags;

Tag = leafBookshelf.Model.extend({

  tableName : 'tags',

  posts : function() {
    return this.hassToMany('Posts','id');
  }



});

Tags = leafBookshelf.Collection.extend({
  model : Tag
});

module.exports = {
  Tag : leafBookshelf.model('Tag',Tag),
  Tags : leafBookshelf.model('Tags',Tags)
};