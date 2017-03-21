'use strict';

exports.up = function(knex,Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('tags',function(table) {
        table.uuid('_id').notNullable().primary();
        table.string('name').notNullable().unique();
        table.string('slug').notNullable().unique();
        table.timestamps();
    })
  ]);
};

exports.down = function(knex,Promise) {
  return Promise.all([
    knex.schema.dropTable('tags')
  ]);
};
