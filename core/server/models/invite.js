var _ = require('lodash'),
Promise = require('bluebird'),
objectId = require('bson-objectid'),
validator = require('validator'),
randtoken = require('neo-rand-token'),
nodemailer = require('nodemailer'),
moment = require('moment'),

utils = require('../utils'),
leafBookshelf = require('./base'),

Invite;




function sendmail(options) {

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        host : 'smtp.email.it',
        port : 25,
        secure : false, // true for 465, false for other ports
        auth : {
            user : 'alexandro1@email.it', // user
            pass : 'kupoburi4444'  // password
        }
    });

    // send mail with defined transport object
    transporter.sendMail(options,function(error,info) {
        if (error) return console.error(error);
else console.log(info);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
    });

}

Invite = leafBookshelf.Model.extend({

    tableName : 'invites',

    initialize : function() {
      this.on('saving',this.validate);
    },

    /**
     * Validate attributes before saving.
     */

    validate : function() {
      var attrs = this.attributes;

      if (!attrs.id) throw new Error('ID attribute is required.');

      if (!attrs.email) throw new Error('E-mail address is required.');

      if (!validator.isEmail(attrs.email)) throw new Error('Invalid e-mail address.');

      attrs.role_id = attrs.role_id || null;

      attrs.token = randtoken.generate(40); // Generate the token.

      attrs.expires = moment().valueOf() + utils.time.WEEK_IN_MILLISECONDS; // Set expiration.

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
      return leafBookshelf.Model.prototype.format.call(this,attrs);
    }

  },

  {

    /**
     * Get all invites.
     */

    find : Promise.method(function(options) {
      options = options || {};
      options.require = false;

      return this.forge().fetchAll(options).then(function(invites) {
          return invites;
      });
    }),

    /**
     * Get an invite.
     */

    findOne : Promise.method(function(dataToClone,options) {
      options = options || {};
      options.require = false;

      var data = _.cloneDeep(dataToClone);
      return this.forge().where(data).fetch(options).then(function(invite) {
          return invite;
      });
    }),

    /**
     * Insert an invite.
     */

    create : Promise.method(function(attrs) {

      attrs.id = objectId().str;

      attrs.created_by = 'xxxxxxxxxxxxxxxxxxxxxxxx'; // Should be the logged in user ID.

      var options = {require : true,method : 'insert'};

      return this.forge().save(attrs,options).then(function(invite) {

          var html = '<p>Hi! You have been invited to join Leaf site.</p>' +
                    '<p>Please, click the link below to complete the registration and join our team!</p>' +
                    '<p><a href="http://localhost:3000/admin/signup/' + invite.token + '/">http://localhost:3000/admin/signup/' + invite.token + '/</a></p>' +
                    '<p>If the link does not work, copy and paste it into your browser address bar.</p>' +
                    '<p>This invitation will be valid for the next <strong>7 days</strong>.</p>' +
                    '<hr />' +
                    '<p>Please, do not reply to this message because it is automatic generated.</p>';

          var options = {
              from : 'alexandro1@email.it', // sender address
              to : attrs.email, // list of receivers
              subject : 'Invitation from Leaf', // Subject line
              html : html // html body
          };

          //sendmail(options);
          return invite;
      });
    }),

    /**
     * Update an invite.
     */

    update : Promise.method(function(attrs) {

        var t = this;

        var options = {require : true};

        return t.forge().where({id : attrs.id}).fetch(options).then(function(invite) {

          attrs = _.extend(invite.serialize(),attrs);
          attrs = _.omit(attrs,'updated_at');

          attrs.updated_by = 'xxxxxxxxxxxxxxxxxxxxxxxx'; // Should be the logged in user ID.

          var options = {require : true,method : 'update',patch : false,defaults : false};

          return t.forge({id : attrs.id}).save(attrs,options).then(function(invite) {
              return invite;
          });

        });

    }),

    /**
     * Delete an invite.
     */

    remove : Promise.method(function(id) {
      return this.forge({id : id}).destroy({require : true}).then(function(invite) {
        return invite;
      });
    })

});

module.exports = {
  Invite : leafBookshelf.model('Invite',Invite)
};