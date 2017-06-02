var _ = require('lodash'),
db = require('../db'),
schema = require('./schema');

function addTableColumn(tableName,table,columnName) {
  var columnData = schema[tableName][columnName],
  column;

  if (columnData.type==='text' && columnData.hasOwnProperty('fieldtype')) column = table[columnData.type](columnName,columnData.fieldtype);
  else if (columnData.type==='string') {
      if (columnData.hasOwnProperty('maxlength')) column = table[columnData.type](columnName,columnData.maxlength);
      else column = table[columnData.type](columnName,191);
  }
  else column = table[columnData.type](columnName);

  if (columnData.hasOwnProperty('nullable') && columnData.nullable) column.nullable();
  else column.notNullable();

  if (columnData.hasOwnProperty('primary') && columnData.primary) column.primary();

  if (columnData.hasOwnProperty('unique') && columnData.unique) column.unique();

  if (columnData.hasOwnProperty('unsigned') && columnData.unsigned) column.unsigned();

  if (columnData.hasOwnProperty('references')) column.references(columnData.references);

  if (columnData.hasOwnProperty('defaultTo')) column.defaultTo(columnData.defaultTo);
}

function addColumn(tableName,column,transaction) {
  return (transaction || db.knex).schema.table(tableName,function(table) {
    addTableColumn(tableName,table,column);
  });
}

/**
 * createTableIfNotExists() can throw error if indexes are already in place!
 */

function createTable(table,transaction) {
  return (transaction || db.knex).schema.hasTable(table).then(function(exists) {
    if (exists) return;
    return (transaction || db.knex).schema.createTable(table,function(t) {
      var columnKeys = _.keys(schema[table]);
      _.each(columnKeys,function(column) {
        return addTableColumn(table,t,column);
      });
    });
  });
}

function dropTable(table,transaction) {
  return (transaction || db.knex).schema.dropTableIfExists(table);
}

module.exports = {
  addColumn : addColumn,
  createTable : createTable,
  dropTable : dropTable

};