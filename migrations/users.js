'use strict';

exports.up = function(knex,Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users',function(table) {
        table.uuid('_id').notNullable().primary();
        table.string('email').notNullable().unique();
        table.string('password').notNullable().defaultTo('');
        table.string('fullname').notNullable().defaultTo('');
        table.string('slug').notNullable().defaultTo('').unique();
        table.string('url').notNullable().defaultTo('');
        table.string('location').notNullable().defaultTo('');
        table.text('description').notNullable().defaultTo('');
        table.string('role').notNullable().defaultTo('author');
        table.timestamps();
    })
  ]);
};

exports.down = function(knex,Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
};
