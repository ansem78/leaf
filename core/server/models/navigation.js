var _ = require('lodash'),
Promise = require('bluebird'),
objectId = require('bson-objectid'),
validator = require('validator'),
utils = require('../utils'),
leafBookshelf = require('./base'),
schema = require('../data/schema'),

Navigation/*,
Navigations*/;

Navigation = leafBookshelf.Model.extend({

    tableName : 'links',

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

      attrs.type = 'nav';

      attrs.name = (_.isEmpty(attrs.name))? 'Untitled' : utils.plaintext(attrs.name);
      if (_.isEmpty(attrs.name)) attrs.name = 'Untitled';

      attrs.slug = utils.slugify(attrs.name);

      if (!_.isEmpty(attrs.url) && !validator.isURL(attrs.url,{require_protocol : true,protocols : ['http','https']})) attrs.url = 'http://' + attrs.url;

      if (attrs.id) {
        attrs.updated_by = 'xxxxxxxxxxxxxxxxxxxxxxxx'; // Should be the logged in user ID.
        attrs.updated_at = true;
      }
      else {
        attrs.created_by = 'xxxxxxxxxxxxxxxxxxxxxxxx'; // Should be the logged in user ID.
        attrs.updated_at = null;
      }

      if (!attrs.id) attrs.id = objectId().str;

      //attrs = this.fixDatesOnSaving(attrs);

      //leafBookshelf.Model.prototype.format.call(this,attrs);

      //console.log(attrs);

      //return attrs;
    }

  },

  {

    // Get all navigation links.
    all : Promise.method(function() {
      return new this({require : false}).where({type : 'nav'}).fetchAll().then(function(navigations) {
          return (navigations)? navigations : [];
      });
    }),

    // Insert a navigation link.
    add : Promise.method(function(data) {
      var options = {require : true,method : 'insert'};

      return new this(options).save(data,options).then(function(navigation) {
          if (!navigation) throw new Error('Error inserting navigation link.');
          else return navigation;
      });
    }),

    // Update a navigation link.
    update : Promise.method(function(data) {
      var options = {require : true,method : 'update',patch : true};

      return new this(options).save(data,options).then(function(navigation) {
          if (!navigation) throw new Error('Error updating navigation link.');
          else return navigation;
      });
    }),

    // Delete a navigation link.
    remove : Promise.method(function(id) {
      var options = {require : true};

      return new this(options).where({id : id,type : 'nav'}).destroy(options).then(function(navigation) {
        if (!navigation) throw new Error('Error deleting navigation link.');
        else return navigation;
      });
    })

  }

);

/*Navigations = leafBookshelf.Collection.extend({
  model : Navigation
});*/

module.exports = {
  Navigation : leafBookshelf.model('Navigation',Navigation)/*,
  Navigations : leafBookshelf.collection('Navigations',Navigations)*/
};