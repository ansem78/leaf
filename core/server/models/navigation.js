var _ = require('lodash'),
Promise = require('bluebird'),
objectId = require('bson-objectid'),
validator = require('validator'),

utils = require('../utils'),
leafBookshelf = require('./base'),

Navigation;

Navigation = leafBookshelf.Model.extend({

    tableName : 'links',

    initialize : function() {
      this.on('saving',this.validate);
    },

    /**
     * Validate attributes before saving.
     */

    validate : function() {
      var attrs = this.attributes;

      if (!attrs.id) throw new Error('ID attribute is required.');

      attrs.name = attrs.name || '';

      attrs.url = attrs.url || '';

      attrs.slug = attrs.slug || '';

      attrs.position = parseInt(attrs.position) || 0;

      attrs.type = 'nav';

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

      if (!_.isEmpty(attrs.url) && !validator.isURL(attrs.url,{require_protocol : true,protocols : ['http','https']})) attrs.url = 'http://' + attrs.url;

      return leafBookshelf.Model.prototype.format.call(this,attrs);
    }

  },

  {

    /**
     * Get all navigation links.
     */

    find : Promise.method(function(options) {
      options = options || {};
      options.require = false;

      return this.forge().where({type : 'nav'}).fetchAll(options).then(function(navigations) {
          return navigations;
      });
    }),

    /**
     * Get a navigation link.
     */

    findOne : Promise.method(function(dataToClone,options) {
      options = options || {};
      options.require = false;

      var data = _.cloneDeep(dataToClone);
      return this.forge().where(data).fetch(options).then(function(navigation) {
          return navigation;
      });
    }),

    /**
     * Insert a navigation link.
     */

    create : Promise.method(function(attrs) {

      attrs.id = objectId().str;

      attrs.created_by = 'xxxxxxxxxxxxxxxxxxxxxxx1'; // Should be the logged in user ID.

      var options = {require : true,method : 'insert'};

      return this.forge().save(attrs,options).then(function(navigation) {
          return navigation;
      });
    }),

    /**
     * Update a navigation link.
     */

    update : Promise.method(function(attrs) {

        var t = this;

        var options = {require : true};

        return t.forge().where({id : attrs.id}).fetch(options).then(function(navigation) {

          attrs = _.extend(navigation.serialize(),attrs);
          attrs = _.omit(attrs,'updated_at');

          attrs.updated_by = 'xxxxxxxxxxxxxxxxxxxxxxxx'; // Should be the logged in user ID.

          var options = {require : true,method : 'update',patch : false,defaults : false};

          return t.forge({id : attrs.id}).save(attrs,options).then(function(navigation) {
              return navigation;
          });

      });

    }),

    /**
     * Delete a navigation link.
     */

    remove : Promise.method(function(id) {
      return this.forge({id : id}).destroy({require : true}).then(function(navigation) {
        return navigation;
      });
    })

});

module.exports = {
  Navigation : leafBookshelf.model('Navigation',Navigation)
};