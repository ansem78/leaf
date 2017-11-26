var _ = require('lodash'),
unidecode = require('unidecode'),

slugify;

// Return a slug from a string.
slugify = function(str) {
  return (_.isEmpty(str))? '' : unidecode(str.toString()).toLowerCase().replace(/[^ \w\d-]/gi,'').replace(/ +/g,'-').replace(/-+/g,'-');
};

module.exports = slugify;