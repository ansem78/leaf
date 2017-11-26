var _ = require('lodash'),
sanitizeHtml = require('sanitize-html'),

plaintext;

// Strip code from text.
plaintext = function(str) {
  return (_.isEmpty(str))? '' : sanitizeHtml(str.toString(),{allowedTags : [],allowedAttributes : []});
};

module.exports = plaintext;