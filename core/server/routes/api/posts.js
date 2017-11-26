var express = require('express'),
dataProvider = require('../../models'),

router = express.Router();

router

// Get list of posts.
.get('/',function(req,res,next) {

})

// Get a post by ID.
.get('/:id',function(req,res,next) {

})

// Create a new post.
.post('/',function(req,res,next) {

})

// Update a post.
.put('/',function(req,res,next) {

})

// Delete a post.
.delete('/:id',function(req,res,next) {

});

module.exports = router;