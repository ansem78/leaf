var express = require('express'),
config = require('../../config'),
dataProvider = require('../../models'),

router = express.Router();

// ---- Check if it's installed. ----

router.all('/check',function(req,res,next) {
  var User = dataProvider.User;
  new User().check().then(function(user) {
    (user)? res.json(user) : res.redirect(config.get('url') + '/admin/setup/');
  });

});

// ---- Setup. ----

router.post('/setup',function(req,res,next) {

});

// ---- Login. ----

router.post('/login',function(req,res,next) {
    var email = req.body.email || '';
    var password = req.body.password || '';

});

// ---- Options. ----

// Get all options.
router.get('/options', function (req, res, next) {

});

// Insert a new option.
router.post('/options', function (req, res, next) {

});

// Update an option.
router.put('/options/:name', function (req, res, next) {

});

// Delete an option.
router.delete('/options/:name', function (req, res, next) {

});

// ---- Users. ----

// Get list of users.
router.get('/users',function(req,res,next) {

});

// Get a user by ID.
router.get('/users/:id',function(req,res,next) {

});

// Create a new user.
router.post('/users',function(req,res,next) {

});

// Update a user.
router.put('/users/:id',function(req,res,next) {

});

// Delete a user.
router.delete('/users/:id',function (req,res,next) {

});

// ---- Posts. ----

// Get list of posts.
router.get('/posts', function (req, res, next) {

});

// Get a post by ID.
router.get('/posts/:id', function (req, res, next) {

});

// Create a new post.
router.post('/posts', function (req, res, next) {

});

// Update a post.
router.put('/posts/:id', function (req, res, next) {

});

// Delete a post.
router.delete('/posts/:id', function (req, res, next) {

});

// ---- Invalid routes. ----

router.use(function (req, res, next) {
    res.send('Welcome to the REST API zone!');
});

module.exports = router;
