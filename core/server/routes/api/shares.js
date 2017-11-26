var express = require('express'),
dataProvider = require('../../models'),

router = express.Router();

router

// Get all shares.
.get('/',function(req,res,next) {
  var Share = dataProvider.Share;
  Share.find().then(function(shares) {
    res.json(shares);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Get a share.
.get('/:id',function(req,res,next) {
  var Share = dataProvider.Share;
  Share.findOne({id : req.params.id}).then(function(share) {
    res.json(share);
  }).catch(Share.NotFoundError,function() {
    var err = new Error('No share found.');
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Create a share.
.post('/',function(req,res,next) {
  var Share = dataProvider.Share;
  Share.create(req.body).then(function(share) {
    res.json(share);
  }).catch(Share.NoRowsUpdatedError,function() {
    var err = new Error('Error adding new share.');
    console.error(err);
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Update a share.
.put('/',function(req,res,next) {
  var Share = dataProvider.Share;
  Share.update(req.body).then(function(share) {
    res.json(share);
  }).catch(Share.NoRowsUpdatedError,function() {
    var err = new Error('Error updating this share.');
    console.error(err);
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Delete a share.
.delete('/:id',function(req,res,next) {
  var Share = dataProvider.Share;
  Share.remove(req.params.id).then(function(share) {
    res.json(share);
  }).catch(Share.NoRowsDeletedError,function() {
    var err = new Error('Error deleting this share.');
    console.error(err);
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
});

module.exports = router;