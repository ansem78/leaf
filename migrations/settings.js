'use strict';

exports.up = function(knex,Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('settings',function(table) {
        table.string('name').notNullable().primary();
        table.text('value','longtext').notNullable().defaultTo('');
    })
  ]);
};

exports.down = function(knex,Promise) {
  return Promise.all([
    knex.schema.dropTable('settings')
  ]);
};
