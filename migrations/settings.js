'use strict';
exports.up = function(knex) {
  return knex.schema
    .createTableIfNotExists('settings', function(table) {
        table.string('name').notNullable().primary();
        table.text('value','longtext').notNullable().defaultTo('');
    });
};
exports.down = function(knex) {
  return knex.schema
    .dropTable('settings');
};
