'use strict';
exports.up = function(knex) {
  return knex.schema
    .createTableIfNotExists('tags', function(table) {
        table.uuid('_id').notNullable().primary();
        table.string('name').notNullable().unique();
        table.string('slug').notNullable().unique();
        table.timestamps();
    });
};
exports.down = function(knex) {
  return knex.schema
    .dropTable('tags');
};
