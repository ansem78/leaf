var _ = require('lodash'),
validator = require('validator');

// Check if a value is empty or a valid URL.
validator.isEmptyOrURL = function(url) {
  if (_.isEmpty(url)) return true;
  return validator.isURL(String(url));
};

module.exports = validator;