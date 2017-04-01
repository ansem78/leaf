const express = require('express');

const router = express.Router();

// ---- Options. ----

// Get all options.
router.get('/options',function(req,res,next) {

});

// Insert a new option.
router.post('/options',function(req,res,next) {

});

// Update an option.
router.put('/options/:name',function(req,res,next) {

});

// Delete an option.
router.delete('/options/:name',function(req,res,next) {

});

// ---- Users. ----

// Get list of users.
router.get('/users',function(req,res,next) {

});

// Get a user by ID, slug or e-mail address.
router.get('/users/:user',function(req,res,next) {

});

// Create a new user.
router.post('/users',function(req,res,next) {

});

// Update a user.
router.put('/users/:id',function(req,res,next) {

});

// Delete a user.
router.delete('/users/:id',function(req,res,next) {

});

// ---- Posts. ----

// Get list of posts.
router.get('/posts',function(req,res,next) {

});

// Get a post by ID or slug.
router.get('/posts/:post',function(req,res,next) {

});

// Create a new post.
router.post('/posts',function(req,res,next) {

});

// Update a post.
router.put('/posts/:id',function(req,res,next) {

});

// Delete a post.
router.delete('/posts/:id',function(req,res,next) {

});

// ---- Invalid routes. ----

router.use(function(req,res,next) {
  res.send('Welcome to the REST API zone!');
});

module.exports = router;
