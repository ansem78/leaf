var _ = require('lodash'),
objectId = require('bson-objectid'),
sanitizeHtml = require('sanitize-html'),
validator = require('validator'),
unidecode = require('unidecode'),
leafBookshelf = require('./base'),
schema = require('../data/schema'),

Share,
Shares;

Share = leafBookshelf.Model.extend({

  tableName : 'links',

  format : function(attrs) {
    var table = schema.tables[this.tableName];

    attrs = this.fixDatesOnSaving(attrs);

    _.each(attrs,function(value,key) {
      if (table.hasOwnProperty(key) && table[key].hasOwnProperty('validations')) {
        _.each(table[key].validations,function(options,fx) {
          if (!validator[fx](value,options)) attrs[key] = (table[key].hasOwnProperty('defaultTo'))? table[key].defaultTo : null;
        });
      }
    });

    attrs.type = 'share';

    attrs.name = sanitizeHtml(attrs.name,{allowedTags : [],allowedAttributes : []});
    if (!attrs.name) attrs.name = 'Untitled';

    attrs.slug = unidecode(attrs.name).toLowerCase().replace(/[^ \w\d-]/gi,'').replace(/ +/g,'-').replace(/-+/g,'-');

    attrs.position = (validator.isInt(attrs.position,{min : 0}))? parseInt(attrs.position) : 0;

    if (!_.isEmpty(attrs.url) && !validator.isURL(attrs.url,{require_protocol : true,protocols : ['http','https']})) attrs.url = 'http://' + attrs.url;

    attrs.created_by = 'aaaaaaaaaaaaaaaaaaaaaaaa';

    return leafBookshelf.Model.prototype.format.call(this,attrs);
  },

  findOne : function() {
    var options = {require : true};

    return Shares.forge(options).where({type : 'share'}).fetch(options).then(function(shares) {
      if (shares) return shares;
    });
  },

  add : function(attrs) {
    var options = {require : true,method : 'insert'};

    attrs = this.format(attrs);

    attrs.id = objectId().str;

    return Share.forge(options).save(attrs,options).then(function(share) {
      return share;
    });
  },



  remove : function(id) {
    var options = {require : true};

    return Share.forge(options).where({id : id,type : 'share'}).fetch(options).then(function(model) {
      return model.destroy().then(function(share) {
        return (share)? share : null;
      });
      return null;
    });
  }


});

Shares = leafBookshelf.Collection.extend({
  model : Share
});

module.exports = {
  Share : leafBookshelf.model('Share',Share),
  Shares : leafBookshelf.collection('Shares',Shares)
};