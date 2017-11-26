var _ = require('lodash'),

models,
exported;

models = [
  'role',
  'user',
  'invite',
  'tag',
  'navigation',
  'share',
  'setting'
];

exported = {};

exported.Base = require('./base');
models.forEach(function(name) {
  _.extend(exported,require('./' + name));
});

module.exports = exported;
/*
exports,
models;

exports = module.exports;

// Expose all models.
models = [
  'post',
  'settings',
  'tag',
  'user',
  'navigation',
  'share'
];

function init() {
  exports.Base = require('./base');
  models.forEach(function(name) {
    _.extend(exports,require('./' + name));
  });
}

// Expose init().
exports = init();
*/