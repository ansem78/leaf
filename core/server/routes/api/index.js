const express = require('express');

const router = express.Router();

// ---- Options. ----

// Get all options.
router.get('/options',function(req,res) {

});

// Insert a new option.
router.post('/options',function(req,res) {

});

// Update an option.
router.put('/options/:name',function(req,res) {

});

// Delete an option.
router.delete('/options/:name',function(req,res) {

});

// ---- Users. ----

// Get list of users.
router.get('/users',function(req,res) {

});

// Get a user by ID, slug or e-mail address.
router.get('/users/:user',function(req,res) {

});

// Create a new user.
router.post('/users',function(req,res) {

});

// Update a user.
router.put('/users/:id',function(req,res) {

});

// Delete a user.
router.delete('/users/:id',function(req,res) {

});

// ---- Posts. ----

// Get list of posts.
router.get('/posts',function(req,res) {

});

// Get a post by ID or slug.
router.get('/posts/:post',function(req,res) {

});

// Create a new post.
router.post('/posts',function(req,res) {

});

// Update a post.
router.put('/posts/:id',function(req,res) {

});

// Delete a post.
router.delete('/posts/:id',function(req,res) {

});

// ---- Invalid routes. ----

router.use(function(req,res,next) {
  res.send('Welcome to the REST API zone!');
});

module.exports = router;