var express = require('express'),

dataProvider = require('../../models'),

router = express.Router();

router

// Login.
.post('/login',function(req,res,next) {

})

// Logout.
.post('/logout',function(req,res,next) {

})

// Registration.
.post('/signup',function(req,res,next) {

})

// Password recovery.
.post('/lostpassword',function(req,res,next) {

})

// Change password.
.post('/changepassword',function(req,res,next) {

});

module.exports = router;