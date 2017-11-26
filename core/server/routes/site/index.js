var express = require('express'),

router = express.Router();

// ---- Site. ----

// Homepage.
router.all('/',function(req,res,next) {
  res.render('index');
});

// Search results.
router.all('/search/:search',function(req,res,next) {
  res.render('search');
});

// Archives.
router.all('/archives/:date',function(req,res,next) {
  res.render('archives');
});

// Author.
router.all('/author/:author',function(req,res,next) {
  res.render('author');
});

// Tag.
router.all('/tag/:tag',function(req,res,next) {
  res.render('tag');
});

// Post or page.
router.all('/:post',function(req,res,next) {
  res.render('post');
});

// ---- Invalid routes. ----

router.use(function(req,res,next) {
  res.render('404');
});

module.exports = router;