var express = require('express'),
dataProvider = require('../../models'),

router = express.Router();

router

// Get all navigation links.
.get('/',function(req,res,next) {
  var Navigation = dataProvider.Navigation;
  Navigation.find().then(function(navigations) {
    res.json(navigations);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Get a navigation link.
.get('/:id',function(req,res,next) {
  var Navigation = dataProvider.Navigation;
  Navigation.findOne({id : req.params.id}).then(function(navigation) {
    res.json(navigation);
  }).catch(Navigation.NotFoundError,function() {
    var err = new Error('No navigation link found.');
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Create a navigation link.
.post('/',function(req,res,next) {
  var Navigation = dataProvider.Navigation;
  Navigation.create(req.body).then(function(navigation) {
    res.json(navigation);
  }).catch(Navigation.NoRowsUpdatedError,function() {
    var err = new Error('Error adding new navigation link.');
    console.error(err);
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Update a navigation link.
.put('/',function(req,res,next) {
  var Navigation = dataProvider.Navigation;
  Navigation.update(req.body).then(function(navigation) {
    res.json(navigation);
  }).catch(Navigation.NotFoundError,function() {
    var err = new Error('No navigation link found.');
    console.error(err);
    res.status(400).json(err);
  }).catch(Navigation.NoRowsUpdatedError,function() {
    var err = new Error('Error updating this navigation link.');
    console.error(err);
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Delete a navigation link.
.delete('/:id',function(req,res,next) {
  var Navigation = dataProvider.Navigation;
  Navigation.remove(req.params.id).then(function(navigation) {
    res.json(navigation);
  }).catch(Navigation.NoRowsDeletedError,function() {
    var err = new Error('Error deleting this navigation link.');
    console.error(err);
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
});

module.exports = router;