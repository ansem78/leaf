const db = require('../db');
//const Joi = require('joi');
const Users = db.Model.extend({
  tableName : 'users',
  hasTimestamps : true,
  /*email:Joi.string,
  password: Joi.string
  ,fullname:Joi.string
  ,slug: Joi.string
  ,location: Joi.string
  ,description: Joi.string
  ,role: Joi.string*/
  posts: function() {
    return this.hasMany(Posts);
  }
});

module.exports = Users;