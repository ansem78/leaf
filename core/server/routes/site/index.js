const express = require('express');

const router = express.Router();

// ---- Site. ----

// Get homepage.
router.get('/',function(req,res) {

});

// Get a post.
router.get('/posts/:post',function(req,res) {

});

// Get a page.
router.get('/pages/:page',function(req,res) {

});

// Get search page.
router.get('/search/:search',function(req,res) {

});

// Get an archive page.
router.get('/archives/:date',function(req,res) {

});

// Get an author page.
router.get('/authors/:author',function(req,res) {

});

// Get a tag page.
router.get('/tags/:tag',function(req,res) {

});

// ---- Invalid routes. ----

router.use(function(req,res,next) {

});

module.exports = router;