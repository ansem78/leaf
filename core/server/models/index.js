var _ = require('lodash'),

exports,
models;

exports = module.exports;

// Expose all models.
models = [
  /*'post',
  'settings',
  'tag',
  'user',*/
  'navigation'/*,
  'share'*/
];

function init() {
  exports.Base = require('./base');
  models.forEach(function(name) {
    _.extend(exports,require('./' + name));
  });
}

// Expose init().
exports = init();