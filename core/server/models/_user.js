var _ = require('lodash'),
Promise = require('bluebird'),
validator = require('validator'),
unidecode = require('unidecode'),
bcrypt = require('bcryptjs'),
leafBookshelf = require('./base'),

bcryptGenSalt = Promise.promisify(bcrypt.genSalt),
bcryptHash = Promise.promisify(bcrypt.hash),
bcryptCompare = Promise.promisify(bcrypt.compare),

activeStates = ['active'],
inactiveStates = ['inactive','locked'],
allStates = activeStates.concat(inactiveStates),

User,
Users;

/**
 * Check password minimum length.
 */

function validatePasswordLength(password) {
  return validator.isLength(password,8);
}

/**
 * Generate a random salt and hash the password with it.
 */

function generatePasswordHash(password) {
  return bcryptGenSalt().then(function(salt) {
    return bcryptHash(password,salt);
  });
}

User = leafBookshelf.Model.extend({

  tableName : 'users',

  posts : function() {
    return this.hasMany('Posts','author_id');
  },

  isActive : function() {
    return inactiveStates.indexOf(this.get('status'))<0;
  },

  isLocked : function() {
    return this.get('status')==='locked';
  },

  isInactive : function() {
    return this.get('status')==='inactive';
  },

  format : function(attrs) {
    if (!_.isEmpty(attrs.url) && !validator.isURL(attrs.url,{require_protocol : true,protocols : ['http','https']})) attrs.url = 'http://' + attrs.url;
    return leafBookshelf.Model.prototype.format.call(this,attrs);
  },

  findOne : function(dataToClone,options) {
    var data = _.cloneDeep(dataToClone);

  },

  getByEmail : function(email,options) {
    options = options || {};

    options.require = true;

    return Users.forge(options).fetch(options).then(function(users) {
      var userWithEmail = users.find(function(user) {
        return user.get('email').toLowerCase()===email.toLowerCase();
      });
      if (userWithEmail) return userWithEmail;
    });
  },

  check : function() {
    var options = {require : true};
    return Users.forge(options).fetch(options).then(function(users) {
      var userWithRole = users.find(function(user) {
        return user.get('role')==='owner';
      });
      if (userWithRole) return userWithRole;
    });
  }



});

Users = leafBookshelf.Collection.extend({
  model : User
});

module.exports = {
  User : leafBookshelf.model('User',User),
  Users : leafBookshelf.collection('Users',Users)
};