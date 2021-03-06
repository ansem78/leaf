var _ = require('lodash'),
Promise = require('bluebird'),
objectId = require('bson-objectid'),
validator = require('validator'),
bcrypt = require('bcryptjs'),
crypto = require('crypto'),

utils = require('../utils'),
leafBookshelf = require('./base'),
Role = require('./role').Role,

bcryptGenSalt = Promise.promisify(bcrypt.genSalt),
bcryptHash = Promise.promisify(bcrypt.hash),
bcryptCompare = Promise.promisify(bcrypt.compare),

User;

/**
 * Check password minimum length.
 */

function validatePasswordLength(password) {
  return validator.isLength(password,8);
}

/**
 * Generate a random salt and hash the password with it.
 */

function generatePasswordHash(password,cb) {
  return bcryptGenSalt().then(function(salt) {
    return bcryptHash(password,salt).then(function(hash) {
        cb(hash);
      return hash;
    });
  });
  return
}

/**
 * Check password against hash.
 */

function checkPasswordHash(password,hash) {
  return bcryptCompare(password,hash).then(function(check) {
    return check;
  });
}

/**
 * Generate Gravatar based on e-mail address.
 */

function generateGravatar(email,secure) {
    //console.log('email models/user.js 56',email)
    //console.log('secure models/user.js 57',secure)// quando chiamato da format è undefined
  secure = secure || false;
  var url = (secure)? 'https://secure' : 'http://www';
  email= 'arph@iol.it'// una mail qualsiasi risolve l'errore
  if(email) // perchè email è undefined? ??
    var hash = crypto.createHash('md5').update(email).digest('hex');
  return url + '.gravatar.com/avatar/' + hash;
}

User = leafBookshelf.Model.extend({

    tableName : 'users',

    initialize : function() {
      this.on('saving',this.validate);
    },

    /**
     * Get uses role.
     */

    role : function() {
      return this.belongsTo(Role,'role_id');
    },

    /**
     * Validate attributes before saving.
     */

    validate : function() {
      var attrs = this.attributes;

      if (!attrs.id) throw new Error('ID attribute is required.');

      if (!attrs.name) throw new Error('User name is required.');

      if (!attrs.email) throw new Error('E-mail address is required.');

      if (!validator.isEmail(attrs.email)) throw new Error('Invalid e-mail address.');

      if (!attrs.password) throw new Error('Password is required.');

      if (!validatePasswordLength(attrs.password)) throw new Error('Password too short.');

      attrs.slug = attrs.slug || '';

      attrs.avatar = '';

      attrs = leafBookshelf.Model.prototype.validate.call(this,attrs);
    },

    /**
     * Parse attributes on fetching.
     */

    parse : function(attrs) {
      return leafBookshelf.Model.prototype.parse.call(this,attrs);
    },

    /**
     * Format attributes on saving.
     */

    format : function(attrs) {
        attrs.password = attrs.password|| 'password' //l'errore scaturisce dalla mancanza della password
        attrs.password = generatePasswordHash(attrs.password,hash=>{attrs.password = hash
                attrs.name = utils.plaintext(attrs.name);
                attrs.slug = utils.slugify((_.isEmpty(attrs.slug))? attrs.name : attrs.slug);
                attrs.email= attrs.email ||'arph@iol.it';// basta una mail qualsiasi
                attrs.avatar = generateGravatar(attrs.email);
        });/* il metodo è asincrono, bcript esegue i calcoli in un thred parallelo*/






            return leafBookshelf.Model.prototype.format.call(this,attrs);


    }

  },

  {

    /**
     * Get all users.
     */

    find : Promise.method(function(options) {
      options = options || {};
      options.require = false;
          this.forge()
          this.forge().fetchAll(options)

      return this.forge().fetchAll(options).then(function(users) {
          return users;
      })
    }),

    /**
     * Get a user.
     */

    findOne : Promise.method(function(dataToClone,options) {
      options = options || {};
      options.require = false;

      var data = _.cloneDeep(dataToClone);
      return this.forge().where(data).fetch(options).then(function(user) {
        return user;
      });
    }),

    /**
     * Get a user by slug.
     */

    getBySlug : Promise.method(function(slug) {
      return this.forge().where({slug : slug}).fetch({require : false}).then(function(user) {
        return user;
      });
    }),

    /**
     * Get a user by e-mail address.
     */

    getByEmail : Promise.method(function(email) {
      return this.forge().where({email : email}).fetch({require : false}).then(function(user) {
        return user;
      });
    }),

    /**
     * Insert a user.
     */

    create : Promise.method(function(attrs) {

      attrs.id = objectId().str;

      attrs.created_by = 'xxxxxxxxxxxxxxxxxxxxxxxx'; // Should be the logged in user ID.

      var options = {require : true,method : 'insert'};

      return this.forge().save(attrs,options).then(function(user) {
          return user;
      });
    }),

    /**
     * Update a user.
     */

    update : Promise.method(function(attrs) {

        var t = this;

        var options = {require : true};

        return t.forge().where({id : attrs.id}).fetch(options).then(function(user) {

          attrs = _.omit(attrs,'password');

          attrs = _.extend(user.serialize(),attrs);
          attrs = _.omit(attrs,'updated_at');

          attrs.updated_by = 'xxxxxxxxxxxxxxxxxxxxxxxx'; // Should be the logged in user ID.

          var options = {require : true,method : 'update',patch : false,defaults : false};

          return t.forge({id : attrs.id}).save(attrs,options).then(function(user) {
              return user;
          });

        });

    }),

    /**
     * Delete a user.
     */

    remove : Promise.method(function(id) {
      return this.forge({id : id}).destroy({require : true}).then(function(user) {
        return user;
      });
    })



});

module.exports = {
  User : leafBookshelf.model('User',User)
};
