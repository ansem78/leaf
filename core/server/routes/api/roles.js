var express = require('express'),
dataProvider = require('../../models'),

router = express.Router();

router

// Get all roles.
.get('/',function(req,res,next) {
  var Role = dataProvider.Role;
  Role.find().then(function(roles) {
    res.json(roles);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Add a role.
.post('/',function(req,res,next) {
  var Role = dataProvider.Role;
  Role.add(req.body).then(function(role) {
    res.json(role);
  }).catch(Role.NoRowsUpdatedError,function() {
    var err = new Error('Error adding this role.');
    console.error(err);
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
});

module.exports = router;