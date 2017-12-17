var express = require('express'),
dataProvider = require('../../models'),

router = express.Router();

router

// Get all tags.
.get('/',function(req,res,next) {
  var Tag = dataProvider.Tag;
  Tag.find().then(function(tags) {
    res.json(tags);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Get a tag.
.get('/:id',function(req,res,next) {
  var Tag = dataProvider.Tag;
  Tag.findOne({id : req.params.id}).then(function(tag) {
    res.json(tag);
  }).catch(Tag.NotFoundError,function() {
    var err = new Error('No tag found.');
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Create a tag.
.post('/',function(req,res,next) {
  var Tag = dataProvider.Tag;
  Tag.create(req.body).then(function(tag) {
    res.json(tag);
  }).catch(Tag.NoRowsUpdatedError,function() {
    var err = new Error('Error adding new tag.');
    console.error(err);
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Update a tag.
.put('/',function(req,res,next) {
  var Tag = dataProvider.Tag;
  Tag.update(req.body).then(function(tag) {
    res.json(tag);
  }).catch(Tag.NotFoundError,function() {
    var err = new Error('No tag found.');
    console.error(err);
    res.status(400).json(err);
  }).catch(Tag.NoRowsUpdatedError,function() {
    var err = new Error('Error updating this tag.');
    console.error(err);
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Delete a tag.
.delete('/:id',function(req,res,next) {
  var Tag = dataProvider.Tag;
  Tag.remove(req.params.id).then(function(tag) {
    res.json(tag);
  }).catch(Tag.NoRowsDeletedError,function() {
    var err = new Error('Error deleting this tag.');
    console.error(err);
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
});

module.exports = router;