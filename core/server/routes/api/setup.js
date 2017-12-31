var express = require('express'),
_ = require('lodash'),
Promise = require('bluebird'),
validator = require('validator'),

dataProvider = require('../../models'),

router = express.Router(),

roles,
options;

// Roles.
roles = {
  owner : 'Owner',
  admin : 'Admin',
  editor : 'Editor',
  author : 'Author'
};

// Settings.
options = {
  site_name : '',
  site_description : '',
  admin_email : '',
  dated_permalinks : true,
  current_theme : 'default',
  posts_per_page : 10,
  posts_per_feed : 10,
  comments_per_page : 50,
  default_role : '',
  avatar_rating : 'g',
  default_avatar : 'mm',
  mailserver_host : 'localhost',
  mailserver_port : 25,
  mailserver_user : '',
  mailserver_password : ''
};

router

// Setup.
.post('/',function(req,res,next) {

  if (!req.body.site_name) res.status(400).json(new Error('Site name is required.'));

  var owner_id,
  author_id,
  promises = [],
  Role = dataProvider.Role,
  Setting = dataProvider.Setting,
  User = dataProvider.User;

  // Populate roles.
  _.each(roles,function(name,slug) {
    promises.push(Role.create({name : name,slug : slug}));
  });

  // When all the roles are created, populate settings and create the owner.
  Promise.all(promises).then(function(responses) {

    // Get owner and author role IDs.
    _.each(responses,function(role) {
      if (role.get('slug')==='owner') owner_id = role.get('id');
      else if (role.get('slug')==='author') author_id = role.get('id');
      if (owner_id && author_id) return;
    });

    // Populate settings.
    options.site_name = req.body.site_name;
    options.admin_email = req.body.email;
    options.default_role = author_id;

    _.each(options,function(value,name) {
      Setting.create({name : name,value : value});
    });

    // Create the owner.
    User.create({name : req.body.name,email : req.body.email,password : req.body.password,role_id : owner_id}).then(function(user) {
      res.json(user);
    }).catch(User.NoRowsUpdatedError,function() {
      var err = new Error('Error creating owner.');
      console.error(err);
      res.status(400).json(err);
    }).catch(function(err) {
      console.error(err);
      res.status(400).json(err);
    });

  });

});

module.exports = router;