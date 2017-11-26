var _ = require('lodash'),
Promise = require('bluebird'),
objectId = require('bson-objectid'),
validator = require('validator'),

utils = require('../utils'),
leafBookshelf = require('./base'),

Post;

Post = leafBookshelf.Model.extend({

    tableName : 'posts',

    initialize : function() {
      this.on('saving',this.validate);
    },

    /**
     * Validate attributes before saving.
     */

    validate : function() {
      var attrs = this.attributes;

      if (!attrs.id) throw new Error('ID attribute is required.');

      if (!attrs.author_id) throw new Error('Author ID is required.');

      if (!attrs.title) throw new Error('Title is required.');

      if (!attrs.slug) attrs.slug = '';

      if (!attrs.markdown) attrs.markdown = null;

      attrs.html = attrs.text = null;

      if (!attrs.page) attrs.page = false;

      if (!attrs.featured) attrs.featured = false;

      if (!attrs.status) attrs.status = null;

      if (!attrs.meta_title) attrs.meta_title = null;

      if (!attrs.meta_description) attrs.meta_description = null;

      if (!attrs.language) attrs.language = null;

      attrs.image = null;

      attrs = leafBookshelf.Model.prototype.validate.call(this,attrs);
    },

    /**
     * Parse attributes on fetching.
     */

    parse : function(attrs) {
      return leafBookshelf.Model.prototype.parse.call(this,attrs);
    },

    /**
     * Format attributes on saving.
     */

    format : function(attrs) {

      if (!attrs.slug) attrs.slug = utils.slugify(attrs.title);

      if (attrs.markdown) {
        attrs.html = utils.markdown.render(attrs.markdown);
        attrs.text = utils.plaintext(attrs.html);
      }

      attrs.page = validator.toBoolean(attrs.page);

      attrs.featured = validator.toBoolean(attrs.featured);

      return leafBookshelf.Model.prototype.format.call(this,attrs);
    }

  },

  {

    /**
     * Get all posts.
     */

    find : Promise.method(function(options) {
      options = options || {};
      options.require = false;

      return this.forge().fetchAll(options).then(function(posts) {
          return posts;
      });
    }),

    /**
     * Get a post.
     */

    findOne : Promise.method(function(dataToClone,options) {
      options = options || {};
      options.require = false;

      var data = _.cloneDeep(dataToClone);
      return this.forge().where(data).fetch(options).then(function(post) {
          return post;
      });
    }),

    /**
     * Insert a post.
     */

    create : Promise.method(function(attrs) {

      attrs.id = objectId().str;

      attrs.created_by = 'xxxxxxxxxxxxxxxxxxxxxxxx'; // Should be the logged in user ID.

      var options = {require : true,method : 'insert'};

      return this.forge().save(attrs,options).then(function(post) {
          return post;
      });
    }),

    /**
     * Update a post.
     */

    update : Promise.method(function(attrs) {

      attrs.updated_by = 'xxxxxxxxxxxxxxxxxxxxxxxx'; // Should be the logged in user ID.

      var options = {require : true,method : 'update',patch : false,defaults : false};

      return this.forge({id : attrs.id}).save(attrs,options).then(function(post) {
          return post;
      });

    }),

    /**
     * Delete a post.
     */

    remove : Promise.method(function(id) {
      return this.forge({id : id}).destroy({require : true}).then(function(post) {
        return post;
      });
    })

});

module.exports = {
  Post : leafBookshelf.model('Post',Post)
};