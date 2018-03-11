var express = require('express'),
dataProvider = require('../../models'),
User = dataProvider.user

var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({ // custom parameters names
    usernameField: 'email',
    passwordField: 'password'
},
  function(username, password, done) {
    User.findOne({ email: username })
    .then(function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.checkPasswordHash(password,user.password)) {// userpassword should be the hash of the password
        return done(null, false, { message: 'Incorrect password.' });
    }
      return done(null, user);
    });
  }
));

var router = express.Router();

router

.post('/api/login',passport.authenticate('local', { failureRedirect: '/login' }), // authenticate as middleware
  function(req, res) {
    res.redirect('/');
  })

module.exports = router;
