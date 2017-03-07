'use strict';
exports.up = function(knex) {
  return knex.schema
    .createTableIfNotExists('shares', function(table) {
        table.uuid('_id').notNullable().primary();
        table.string('name').notNullable().unique();
        table.text('url','longtext').notNullable().unique();
        table.integer('order').notNullable().defaultTo(0);
        table.timestamps();
    });
};
exports.down = function(knex) {
  return knex.schema
    .dropTable('shares');
};
