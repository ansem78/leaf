var markdown = require('markdown-it'),

md = markdown({
  html : true,
  xhtmlOut : true,
  linkify : true,
  typographer : true
});

md.use(require('markdown-it-mark'));
md.use(require('markdown-it-footnote'));

module.exports = md;