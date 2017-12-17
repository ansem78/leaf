var express = require('express'),
dataProvider = require('../../models'),

router = express.Router();

router

// Get all settings.
.get('/',function(req,res,next) {
  var Setting = dataProvider.Setting;
  Setting.find().then(function(settings) {
    res.json(settings);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Insert a new setting.
.post('/',function(req,res,next) {
  var Setting = dataProvider.Setting;
  Setting.create().then(function(setting) {
    res.json(setting);
  }).catch(Setting.NoRowsUpdatedError,function() {
    var err = new Error('Error adding new option.');
    console.error(err);
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Update a setting.
.put('/',function(req,res,next) {
  var Setting = dataProvider.Setting;
  Setting.update(req.body).then(function(setting) {
    res.json(setting);
  }).catch(Setting.NotFoundError,function() {
    var err = new Error('No option found.');
    console.error(err);
    res.status(400).json(err);
  }).catch(Setting.NoRowsUpdatedError,function() {
    var err = new Error('Error updating this option.');
    console.error(err);
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
})

// Delete a setting.
.delete('/:id',function(req,res,next) {
  var Setting = dataProvider.Setting;
  Setting.remove(req.params.id).then(function(setting) {
    res.json(setting);
  }).catch(Setting.NoRowsDeletedError,function() {
    var err = new Error('Error deleting this setting.');
    console.error(err);
    res.status(400).json(err);
  }).catch(function(err) {
    console.error(err);
    res.status(400).end();
  });
});

module.exports = router;