const express = require('express');
var cache = require('express-redis-cache')();
const router = express.Router();

// ---- Site. ----

// Get homepage.
router.get('/',cache.route(),function(req,res,next) {

});

// Get a post.
router.get('/posts/:post',cache.route(),function(req,res,next) {

});

// Get a page.
router.get('/pages/:page',cache.route(),function(req,res,next) {

});

// Get search page.
router.get('/search/:search',cache.route(),function(req,res,next) {

});

// Get an archive page.
router.get('/archives/:date',cache.route(),function(req,res,next) {

});

// Get an author page.
router.get('/authors/:author',cache.route(),function(req,res,next) {

});

// Get a tag page.
router.get('/tags/:tag',cache.route(),function(req,res,next) {

});

// ---- Invalid routes. ----

router.use(function(req,res,next) {

});

module.exports = router;
