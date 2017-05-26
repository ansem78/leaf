const express = require('express');
const router = express.Router();

// ---- Site. ----

// Get homepage.
router.get('/',function(req,res,next) {

});

// Get a post.
router.get('/posts/:post',function(req,res,next) {

});

// Get a page.
router.get('/pages/:page',function(req,res,next) {

});

// Get search page.
router.get('/search/:search',function(req,res,next) {

});

// Get an archive page.
router.get('/archives/:date',function(req,res,next) {

});

// Get an author page.
router.get('/authors/:author',function(req,res,next) {

});

// Get a tag page.
router.get('/tags/:tag',function(req,res,next) {

});

// ---- Invalid routes. ----

router.use(function(req,res,next) {

});

module.exports = router;
