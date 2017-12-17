var _ = require('lodash'),
Promise = require('bluebird'),
objectId = require('bson-objectid'),
validator = require('validator'),

utils = require('../utils'),
leafBookshelf = require('./base'),

Setting;

/**
 * Parse a core setting.
 */

function parseCoreSetting(name,value) {

  if (value===undefined || value===null) value = '';

  value = value.toString();

  switch (name) {

    case 'posts_per_page':
    case 'posts_per_feed':
    case 'comments_per_page':
    case 'mailserver_port':
    return validator.toInt(value);

    case 'dated_permalinks':
    return validator.toBoolean(value);

    case 'default_avatar':
    return (validator.isIn(value,['mm','','blank','identicon','monsterid','wavatar','robohash','retro']))? value : '';

    default:
    return value;
  }

}

/**
 * Format a core setting.
 */

function formatCoreSetting(name,value) {

  if (!value) value = '';
  value = value.toString();

  switch (name) {

    case 'site_name':
    case 'site_description':
    return utils.plaintext(value);

    case 'admin_email':
    return (validator.isEmail(value))? value : '';

    case 'current_theme':
    return (validator.matches(value,/^[a-z0-9_-]+$/gi))? value : 'default';

    case 'dated_permalinks':
    return (validator.toBoolean(value))? '1' : '0';

    case 'posts_per_page':
    case 'posts_per_feed':
    return (validator.isInt(value,{min : 1,max : 50}))? validator.toInt(value) : 1;

    case 'comments_per_page':
    return (validator.isInt(value,{min : 1,max : 300}))? validator.toInt(value) : 1;

    case 'avatar_rating':
    value = value.toLowerCase();
    return (validator.isIn(value,['g','pg','r','x']))? value : 'g';

    case 'default_avatar':
    value = value.toLowerCase();
    return (validator.isIn(value,['mm','','blank','identicon','monsterid','wavatar','robohash','retro']))? value : 'mm';

    case 'mailserver_host':
    return (validator.matches(value,/^[a-z_][a-z0-9_\.]+$/gi))? value : '';

    case 'mailserver_port':
    return (validator.isInt(value,{min : 1}))? validator.toInt(value) : 25;

    case 'mailserver_user':
    return (validator.matches(value,/^[a-z_][a-z0-9_\.@-]+$/gi))? value : '';

    default:
    return value;
  }

}

Setting = leafBookshelf.Model.extend({

    tableName : 'settings',

    initialize : function() {
      this.on('saving',this.validate);
    },

    /**
     * Validate attributes before saving.
     */

    validate : function() {
      var attrs = this.attributes;

      if (!attrs.id) throw new Error('ID attribute is required.');

      if (!attrs.name) throw new Error('Setting name is required.');

      attrs.value = attrs.value || '';

      attrs.type = attrs.type || null;

      attrs = leafBookshelf.Model.prototype.validate.call(this,attrs);
    },

    /**
     * Parse attributes on fetching.
     */

    parse : function(attrs) {
      attrs.value = parseCoreSetting(attrs.name,attrs.value);
      return leafBookshelf.Model.prototype.parse.call(this,attrs);
    },

    /**
     * Format attributes on saving.
     */

    format : function(attrs) {

      attrs.value = formatCoreSetting(attrs.name,attrs.value);

      return leafBookshelf.Model.prototype.format.call(this,attrs);
    }

  },

  {

    /**
     * Get all settings.
     */

    find : Promise.method(function(options) {
      options = options || {};
      options.require = false;

      return this.forge().fetchAll(options).then(function(settings) {
          return settings;
      });
    }),

    /**
     * Get a setting.
     */

    findOne : Promise.method(function(name,options) {
      options = options || {};
      options.require = true;

      return this.forge().where({name : name}).fetch(options).then(function(setting) {
        return setting;
      });
    }),

    /**
     * Insert a setting.
     */

    create : Promise.method(function(attrs) {

      attrs.id = objectId().str;

      attrs.created_by = 'xxxxxxxxxxxxxxxxxxxxxxxx'; // Should be the logged in user ID.

      var options = {require : true,method : 'insert'};

      return this.forge().save(attrs,options).then(function(setting) {
          return setting;
      });
    }),

    /**
     * Update a setting.
     */

    update : Promise.method(function(attrs) {

        var t = this;

        var options = {require : true};

        return t.forge().where({id : attrs.id}).fetch(options).then(function(setting) {

          attrs = _.extend(setting.serialize(),attrs);
          attrs = _.omit(attrs,'updated_at');

          attrs.updated_by = 'xxxxxxxxxxxxxxxxxxxxxxxx'; // Should be the logged in user ID.

          var options = {require : true,method : 'update',patch : false,defaults : false};

          return t.forge({id : attrs.id}).save(attrs,options).then(function(setting) {
            return setting;
          });

        });

    }),

    /**
     * Delete a setting.
     */

    remove : Promise.method(function(id) {
      return this.forge({id : id}).fetch(options).then(function(setting) {
        if (setting.type==='core') throw new Error('This is a protected setting.');

        return this.forge({id : id}).destroy({require : false}).then(function(setting) {
          return setting;
        });

      });

    })

});

module.exports = {
  Setting : leafBookshelf.model('Setting',Setting)
};