var _ = require('lodash'),
Promise = require('bluebird'),
objectId = require('bson-objectid'),
validator = require('validator'),
utils = require('../utils'),
leafBookshelf = require('./base'),
schema = require('../data/schema'),

Setting/*,
Settings*/;

Setting = leafBookshelf.Model.extend({

    tableName : 'settings',

    initialize : function() {
      //this.on('fetching',this.fixDatesOnFetching);
      this.on('saving',this.validateSave);
    },

    // Validate a navigation link object.
    validateSave : function() {

      var attrs = this.attributes;

      var table = schema.tables[this.tableName];

      _.each(attrs,function(value,key) {
        if (table.hasOwnProperty(key)) {
          if (table[key].hasOwnProperty('validations')) {
            _.each(table[key].validations,function(options,fx) {
              if (!validator[fx](value.toString(),options)) attrs[key] = (table[key].hasOwnProperty('defaultTo'))? table[key].defaultTo : null;
            });
          }
          else if (!attrs[key]) attrs[key] = (table[key].hasOwnProperty('defaultTo'))? table[key].defaultTo : null;
        }
        else delete attrs[key];
      });

      if (!_.isEmpty(attrs.key)) attrs.key = objectId().str;

      if (attrs.id) {
        attrs.updated_by = 'xxxxxxxxxxxxxxxxxxxxxxxx'; // Should be the logged in user ID.
        attrs.updated_at = true;
      }
      else {
        attrs.created_by = 'xxxxxxxxxxxxxxxxxxxxxxxx'; // Should be the logged in user ID.
        attrs.updated_at = null;
      }

      if (!attrs.id) attrs.id = objectId().str;

    }

  },

  {

    // Get all settings.
    all : Promise.method(function() {
      return new this({require : false}).fetchAll().then(function(settings) {
          return (settings)? settings : [];
      });
    })



});

/*Settings = leafBookshelf.Collection.extend({
  model : Setting
});*/

module.exports = {
  Setting : leafBookshelf.model('Setting',Setting)/*,
  Settings : leafBookshelf.model('Settings',Settings)*/
};