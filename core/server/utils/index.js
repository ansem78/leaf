var markdown = require('./markdown'),
slugify = require('./slugify'),
plaintext = require('./plaintext'),
validator = require('./validator');

module.exports = {
  time : {
    MINUTE_IN_MILLISECONDS : 60000,
    HOUR_IN_MILLISECONDS : 3600000,
    DAY_IN_MILLISECONDS : 86400000,
    WEEK_IN_MILLISECONDS : 604800000
  },
  markdown : markdown,
  slugify : slugify,
  plaintext : plaintext,
  validator : validator
};