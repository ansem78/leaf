var express = require('express'),
dataProvider = require('../../models'),

router = express.Router();

router

// Get all invited users.
.get('/',function(req,res,next) {
  var Invite = dataProvider.Invite;
  Invite.find().then(function(invites) {
    res.json(invites);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Get an invited user.
.get('/:id',function(req,res,next) {
  var Invite = dataProvider.Invite;
  Invite.findOne({id : req.params.id}).then(function(invite) {
    res.json(invite);
  }).catch(Invite.NotFoundError,function() {
    var err = new Error('No invited user found.');
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Invite a user.
.post('/',function(req,res,next) {
  var Invite = dataProvider.Invite;
  Invite.create(req.body).then(function(invite) {
    res.json(invite);
  }).catch(Invite.NoRowsUpdatedError,function() {
    var err = new Error('Error inviting user.');
    console.error(err);
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Update an invited user.
.put('/',function(req,res,next) {
  var Invite = dataProvider.Invite;
  Invite.update(req.body).then(function(invite) {
    res.json(invite);
  }).catch(Invite.NotFoundError,function() {
    var err = new Error('No invited user found.');
    res.status(400).json(err);
  }).catch(Invite.NoRowsUpdatedError,function() {
    var err = new Error('Error updating this invited user.');
    console.error(err);
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Delete an invited user.
.delete('/:id',function(req,res,next) {
  var Invite = dataProvider.Invite;
  Invite.remove(req.params.id).then(function(invite) {
    res.json(invite);
  }).catch(Invite.NoRowsDeletedError,function() {
    var err = new Error('Error deleting this invited user.');
    console.error(err);
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
});

module.exports = router;