'use strict';
exports.up = function(knex) {
  return knex.schema
    .createTableIfNotExists('settings', function(table) {
        table.uuid('_id').notNullable().primary();
        table.string('title').notNullable().defaultTo('');
        table.string('slug').notNullable().defaultTo('').unique();
        table.string('author').notNullable().defaultTo('').references('_id').inTable('users');
        table.text('excerpt').notNullable().defaultTo('');
        table.text('content','longtext').notNullable().defaultTo('');
        table.integer('featured').notNullable().defaultTo(0);
        table.string('status').notNullable().defaultTo('draft');
        table.string('type').notNullable().defaultTo('post');
        table.string('comments_status').notNullable().defaultTo('open');
        table.integer('comments_count').notNullable().defaultTo(0);
        table.timestamps();
    });
};
exports.down = function(knex) {
  return knex.schema
    .dropTable('settings');
};
