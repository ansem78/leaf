var _ = require('lodash'),
moment = require('moment'),
bookshelf = require('bookshelf'),
db = require('../../data/db'),
schema = require('../../data/schema'),

leafBookshelf;

// Initializes a new Bookshelf instance called leafBookshelf, for reference elsewhere in Leaf.
leafBookshelf = bookshelf(db.knex);

// Load the Bookshelf registry plug-in to avoid circular dependencies.
leafBookshelf.plugin('registry');

leafBookshelf.Model = leafBookshelf.Model.extend({

  // Bookshelf "hasTimestamps": handles created_at and updated_at properties.
  hasTimestamps : true,

  /**
   * All supported databases (pg, sqlite, mysql) return different values.
   *
   * sqlite: knex returns a UTC String.
   * pg: has an active UTC session through knex and returns UTC Date.
   * mysql: knex wraps the UTC value into a local JS Date.
   */
  fixDatesOnFetching : function(attrs) {
    var table = schema.tables[this.tableName];

    _.each(attrs,function(value,key) {
      if (value!==null && table.hasOwnProperty(key) && table[key].type==='dateTime') attrs[key] = moment(value).toDate();
    });

    return attrs;
  },

  // Before insert or update dates into the database, normalize date format.
  fixDatesOnSaving : function(attrs) {
    var table = schema.tables[this.tableName];

    _.each(attrs,function(value,key) {
      if (value!==null && table.hasOwnProperty(key) && table[key].type==='dateTime') attrs[key] = moment(value).format('YYYY-MM-DD HH:mm:ss');
    });

    return attrs;
  }



});

module.exports = leafBookshelf;