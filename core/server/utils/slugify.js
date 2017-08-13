var unidecode = require('unidecode'),

slugify;

// Return a slug from a string.
slugify = function(str) {
  return (str)? unidecode(str.toString()).toLowerCase().replace(/[^ \w\d-]/gi,'').replace(/ +/g,'-').replace(/-+/g,'-') : '';
};

module.exports = slugify;