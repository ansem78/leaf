var _ = require('lodash'),
Promise = require('bluebird'),
objectId = require('bson-objectid'),
validator = require('validator'),

utils = require('../utils'),
leafBookshelf = require('./base'),

Role;

Role = leafBookshelf.Model.extend({

    tableName : 'roles',

    initialize : function() {
      this.on('saving',this.validate);
    },

    /**
     * Validate attributes before saving.
     */

    validate : function() {
      var attrs = this.attributes;

      if (!attrs.id) throw new Error('ID attribute is required.');

      if (!attrs.name) throw new Error('Role name is required.');

      attrs.id = attrs.id || objectId().str;

      attrs.slug = attrs.slug || '';

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

      return leafBookshelf.Model.prototype.format.call(this,attrs);
    }

  },

  {

    /**
     * Get all roles.
     */

    find : Promise.method(function(options) {
      options = options || {};
      options.require = false;

      return this.forge().fetchAll(options).then(function(roles) {
          return roles;
      });
    }),

    /**
     * Insert a role.
     */

    create : Promise.method(function(attrs) {

      attrs.id = objectId().str;

      attrs.created_by = 'xxxxxxxxxxxxxxxxxxxxxxxx'; // Should be the logged in user ID.

      var options = {require : true,method : 'insert'};

      return this.forge().save(attrs,options).then(function(role) {
          return role;
      });
    }),

    /**
     * Update a role.
     */

    update : Promise.method(function(attrs) {

      attrs.updated_by = 'xxxxxxxxxxxxxxxxxxxxxxxx'; // Should be the logged in user ID.

      var options = {require : true,method : 'update',patch : false,defaults : false};

      return this.forge({id : attrs.id}).save(attrs,options).then(function(role) {
          return role;
      });

    }),

    /**
     * Delete a role.
     */

    remove : Promise.method(function(id) {
      return this.forge({id : id}).destroy({require : true}).then(function(role) {
        return role;
      });
    })

});

module.exports = {
  Role : leafBookshelf.model('Role',Role)
};