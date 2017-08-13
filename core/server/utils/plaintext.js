var sanitizeHtml = require('sanitize-html'),

plaintext;

// Strip code from text.
plaintext = function(str) {
  return (str)? sanitizeHtml(str.toString(),{allowedTags : [],allowedAttributes : []}) : '';
};

module.exports = plaintext;