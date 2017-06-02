var _ = require('lodash'),
schema = require('../core/server/data/schema'),
//commands = schema.commands,
tables = schema.tables,
schemaTables = Object.keys(tables);

exports.up = function(knex,Promise) {

  var promises = [];

  _.each(schemaTables,function(tableName) {
    promises.push(knex.schema.createTableIfNotExists(tableName,function(table) {

      var columnKeys = _.keys(tables[tableName]);
      _.each(columnKeys,function(columnName) {

        var columnData = tables[tableName][columnName],
        column;

        if (columnData.type==='text' && columnData.hasOwnProperty('fieldtype')) column = table[columnData.type](columnName,columnData.fieldtype);
        else if (columnData.type==='string') {
            if (columnData.hasOwnProperty('maxlength')) column = table[columnData.type](columnName,columnData.maxlength);
            else column = table[columnData.type](columnName,191);
        }
        else column = table[columnData.type](columnName);

        column.nullable(columnData.hasOwnProperty('nullable') && columnData.nullable);

        if (columnData.hasOwnProperty('primary') && columnData.primary) column.primary();

        if (columnData.hasOwnProperty('unique') && columnData.unique) column.unique();

        if (columnData.hasOwnProperty('unsigned') && columnData.unsigned) column.unsigned();

        if (columnData.hasOwnProperty('references')) column.references(columnData.references);

        if (columnData.hasOwnProperty('defaultTo')) column.defaultTo(columnData.defaultTo);

      });

    }));

  });

  return Promise.all(promises);

};

exports.down = function(knex,Promise) {

  var promises = [];

  _.each(schemaTables,function(tableName) {
    promises.push(knex.schema.dropTableIfExists(tableName));
  });

  return Promise.all(promises);

};