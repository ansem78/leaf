var _ = require('lodash'),
objectId = require('bson-objectid'),
validator = require('validator'),
utils = require('../utils'),
leafBookshelf = require('./base'),
schema = require('../data/schema'),

Navigation,
Navigations;

Navigation = leafBookshelf.Model.extend({

    tableName : 'links',

    // Validate a navigation link object.
    validateSave : function() {
      /*var table = schema.tables[this.tableName];

      _.each(attrs,function(value,key) {
        if (table.hasOwnProperty(key) && table[key].hasOwnProperty('validations')) {
          _.each(table[key].validations,function(options,fx) {
            if (!validator[fx](value,options)) attrs[key] = (table[key].hasOwnProperty('defaultTo'))? table[key].defaultTo : null;
          });
        }
      });*/

      var attrs = this.attributes;

      attrs.type = 'nav';

      attrs.name = (_.isEmpty(attrs.name))? 'Untitled' : utils.plaintext(attrs.name);
      if (_.isEmpty(attrs.name)) attrs.name = 'Untitled';

      attrs.slug = utils.slugify(attrs.name);

      attrs.position = (!_.isEmpty(attrs.position) && validator.isInt(attrs.position.toString(),{min : 0}))? parseInt(attrs.position) : 0;

      if (!_.isEmpty(attrs.url) && !validator.isURL(attrs.url,{require_protocol : true,protocols : ['http','https']})) attrs.url = 'http://' + attrs.url;

      attrs.created_by = 'aaaaaaaaaaaaaaaaaaaaaaaa'; // Should be the logged in user ID.

      //leafBookshelf.Model.prototype.format.call(this,attrs);

      return attrs;
    },

    initialize : function() {
      this.on('fetching',this.fixDatesOnFetching);
      this.on('saving',this.validateSave);
    }

  },

  {

    // Insert a navigation link.
    add : function(attrs) {
      var options = {require : true,method : 'insert'};

      attrs.id = objectId().str;

      return this.forge(options).save(attrs,options).then(function(navigation) {
          if (!navigation) throw new Error('Error inserting navigation link.');
          else return navigation;
      });
    },

    // Update a navigation link.
    update : function(attrs) {
      var options = {require : true,method : 'update',patch : true};

      return this.forge(options).save(attrs,options).then(function(navigation) {
          if (!navigation) throw new Error('Error updating navigation link.');
          else return navigation;
      });
    },

    // Delete a navigation link.
    remove : function(id) {
      var options = {require : true};

      return this.forge(options).where({id : id,type : 'nav'}).fetch(options).then(function(model) {
        return model.destroy().then(function(navigation) {
          if (!navigation) throw new Error('Error deleting navigation link.');
          else return navigation;
        });
      });
    }

  }

);

Navigations = leafBookshelf.Collection.extend({
  model : Navigation
});

module.exports = {
  Navigation : leafBookshelf.model('Navigation',Navigation),
  Navigations : leafBookshelf.collection('Navigations',Navigations)
};