var _ = require('lodash'),

//exports,
models;

// Expose all models.

models = [
  'post',
  'settings',
  'tag',
  'user'
];

//exports = module.exports;

//function init() {
  module.exports.Base = require('./base');
  models.forEach(function(name) {
    _.extend(module.exports,require('./' + name));
  });
/*}

// Expose init().

exports.init = init;*/