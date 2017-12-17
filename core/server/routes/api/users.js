var express = require('express'),
dataProvider = require('../../models'),

router = express.Router();

router

// Get all users.
router.get('/',function(req,res,next) {
  var User = dataProvider.User;
  User.find({withRelated : ['role']}).then(function(users) {
    users.each(function(user) {
      user.omit('password');
    });
    res.json(users);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Get a user.
.get('/:id',function(req,res,next) {
  var User = dataProvider.User;
  User.findOne({id : req.params.id},{withRelated : ['role']}).then(function(user) {
    res.json(user.omit('password'));
  }).catch(User.NotFoundError,function() {
    var err = new Error('No user found.');
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Create a user.
.post('/',function(req,res,next) {
  var User = dataProvider.User;
  User.create(req.body).then(function(user) {
    res.json(user.omit('password'));
  }).catch(User.NoRowsUpdatedError,function() {
    var err = new Error('Error creating user.');
    console.error(err);
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Update a user.
.put('/',function(req,res,next) {
  var User = dataProvider.User;
  User.update(req.body).then(function(user) {
    res.json(user.omit('password'));
  }).catch(User.NotFoundError,function() {
    var err = new Error('No user found.');
    res.status(400).json(err);
  }).catch(User.NoRowsUpdatedError,function() {
    var err = new Error('Error updating this user.');
    console.error(err);
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Delete a user.
.delete('/:id',function(req,res,next) {
  var User = dataProvider.User;
  User.remove(req.params.id).then(function(user) {
    res.json(user);
  }).catch(User.NoRowsDeletedError,function() {
    var err = new Error('Error deleting this user.');
    console.error(err);
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
});

module.exports = router;