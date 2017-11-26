var express = require('express'),
path = require('path'),

dataProvider = require('../../models'),
config = require('../../config'),

router = express.Router(),

adminPath,
redirectTo;

adminPath = path.resolve(config.get('paths:corePath') + '/server/admin/index.html');

redirectTo = config.get('url') + '/admin';

router

// Setup.
.all('/setup',function(req,res,next) {
  Setting = dataProvider.Setting;
  Setting.findOne('admin_email').then(function(setting) {
    res.redirect(redirectTo + '/login/');
  }).catch(Setting.NotFoundError,function() {
    res.sendFile(adminPath);
  }).catch(function(err) {
    res.sendFile(adminPath);
  });
})

// Admin.
.all('/*',function(req,res,next) {
  Setting = dataProvider.Setting;
  Setting.findOne('admin_email').then(function(setting) {
    res.sendFile(adminPath);
  }).catch(Setting.NotFoundError,function() {
    res.redirect(redirectTo + '/setup/');
  }).catch(function(err) {
    res.redirect(redirectTo + '/setup/');
  });
});

module.exports = router;