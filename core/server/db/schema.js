const db = require('./index');

// Users.
db.knex.schema.createTableIfNotExists('users',function(table) {
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
});

// Posts.
db.knex.schema.createTableIfNotExists('posts',function(table) {
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

// Settings.
db.knex.schema.createTableIfNotExists('settings',function(table) {
  table.string('name').notNullable().primary();
  table.text('value','longtext').notNullable().defaultTo('');
  table.timestamps();
});

// Tags.
db.knex.schema.createTableIfNotExists('tags',function(table) {
  table.uuid('_id').notNullable().primary();
  table.string('name').notNullable().unique();
  table.string('slug').notNullable().unique();
  table.timestamps();
});

// Navigation.
db.knex.schema.createTableIfNotExists('navigation',function(table) {
  table.uuid('_id').notNullable().primary();
  table.string('name').notNullable().unique();
  table.text('url','longtext').notNullable().unique();
  table.integer('order').notNullable().defaultTo(0);
  table.timestamps();
});

// Shares.
db.knex.schema.createTableIfNotExists('shares',function(table) {
  table.uuid('_id').notNullable().primary();
  table.string('name').notNullable().unique();
  table.text('url','longtext').notNullable().unique();
  table.integer('order').notNullable().defaultTo(0);
  table.timestamps();
});