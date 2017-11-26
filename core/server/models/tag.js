var _ = require('lodash'),
Promise = require('bluebird'),
objectId = require('bson-objectid'),
validator = require('validator'),

utils = require('../utils'),
leafBookshelf = require('./base'),

Tag;

Tag = leafBookshelf.Model.extend({

    tableName : 'tags',

    initialize : function() {
      this.on('saving',this.validate);
    },

    /**
     * Validate attributes before saving.
     */

    validate : function() {
      var attrs = this.attributes;

      if (!attrs.id) throw new Error('ID attribute is required.');

      if (_.isEmpty(utils.plaintext(attrs.name))) throw new Error('Tag name is required.');

      attrs.slug = attrs.slug || null;

      attrs.description = attrs.description || null;

      attrs.image = attrs.meta_title = attrs.meta_description = null;

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

      attrs.name = utils.plaintext(attrs.name);

      attrs.slug = utils.slugify((_.isEmpty(attrs.slug))? attrs.name : attrs.slug);

      if (!_.isEmpty(attrs.description)) {
        attrs.description = utils.plaintext(attrs.description);
        if (attrs.description.length>200) attrs.description.substring(0,200);
      }

      return leafBookshelf.Model.prototype.format.call(this,attrs);
    },

    /**
     * Get posts related to a tag.
     */

    posts : function() {
      return this.belongsToMany(Posts);
    }

  },

  {

    /**
     * Get all tags.
     */

    find : Promise.method(function(options) {
      options = options || {};
      options.require = false;

      return this.forge().fetchAll(options).then(function(tags) {
          return tags;
      });
    }),

    /**
     * Get a tag.
     */

    findOne : Promise.method(function(dataToClone,options) {
      options = options || {};
      options.require = false;

      var data = _.cloneDeep(dataToClone);
      return this.forge().where(data).fetch(options).then(function(tag) {
          return tag;
      });
    }),

    /**
     * Insert a tag.
     */

    create : Promise.method(function(attrs) {

      attrs.id = objectId().str;

      attrs.created_by = 'xxxxxxxxxxxxxxxxxxxxxxxx'; // Should be the logged in user ID.

      var options = {require : true,method : 'insert'};

      return this.forge().save(attrs,options).then(function(tag) {
          return tag;
      });
    }),

    /**
     * Update a tag.
     */

    update : Promise.method(function(attrs) {

      attrs.updated_by = 'xxxxxxxxxxxxxxxxxxxxxxxx'; // Should be the logged in user ID.

      var options = {require : true,method : 'update',patch : false,defaults : false};

      return this.forge({id : attrs.id}).save(attrs,options).then(function(tag) {
          return tag;
      });

    }),

    /**
     * Delete a tag.
     */

    remove : Promise.method(function(id) {
      return this.forge({id : id}).destroy({require : true}).then(function(tag) {
        return tag;
      });
    })



});

module.exports = {
  Tag : leafBookshelf.model('Tag',Tag)
};