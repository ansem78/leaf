var express = require('express'),

router = express.Router(),

routes;

routes = [
  'setup',
  'auth',
  'settings',
  'roles',
  'invites',
  'users',
  'posts',
  'tags',
  'navigation',
  'shares',
  'themes',
  'misc'
];

routes.forEach(function(name) {
  router.use('/' + name,require('./' + name));
});

// Invalid routes.
router.use(function(req,res,next) {
    res.send('Welcome to the REST API zone!');
});

module.exports = router;