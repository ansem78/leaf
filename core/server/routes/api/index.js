var express = require('express'),
config = require('../../config'),
dataProvider = require('../../models'),

router = express.Router();

// ---- Check if it's installed. ----

router.all('/check',function(req,res,next) {
  var User = dataProvider.User;
  new User().check().then(function(user) {
    res.json(user);
  }).catch(function(error) {
    res.redirect(config.get('url') + '/admin/setup/');
  });
});

// ---- Setup. ----

router.post('/setup',function(req,res,next) {

});

// ---- Login. ----

router.post('/login',function(req,res,next) {
    var email = req.body.email || '';
    var password = req.body.password || '';

});

// ---- Settings. ----

// Get all settings.
router.get('/settings',function(req,res,next) {
  var Setting = dataProvider.Setting;
  Setting.all().then(function(settings) {
    res.json(settings);
  }).catch(function(error) {
    res.json({error : error});
  });
});

// Insert a new setting.
router.post('/settings',function(req,res,next) {

});

// Update a setting.
router.put('/settings/:name',function(req,res,next) {

});

// Delete a setting.
router.delete('/settings/:name',function(req,res,next) {

});

// ---- Users. ----

// Get list of users.
router.get('/users',function(req,res,next) {

});

// Get a user by ID.
router.get('/users/:id',function(req,res,next) {

});

// Create a new user.
router.post('/users',function(req,res,next) {

});

// Update a user.
router.put('/users/:id',function(req,res,next) {

});

// Delete a user.
router.delete('/users/:id',function (req,res,next) {

});

// ---- Posts. ----

// Get list of posts.
router.get('/posts', function (req, res, next) {

});

// Get a post by ID.
router.get('/posts/:id', function (req, res, next) {

});

// Create a new post.
router.post('/posts', function (req, res, next) {

});

// Update a post.
router.put('/posts/:id', function (req, res, next) {

});

// Delete a post.
router.delete('/posts/:id',function(req,res,next) {

});

// ---- Navigation. ----

// Get all navigation links.
router.get('/navigation',function(req,res,next) {
  var Navigation = dataProvider.Navigation;
  Navigation.all().then(function(navigations) {
    res.json(navigations);
  }).catch(function(error) {
    res.json({error : error});
  });
});

// Create a navigation link.
router.post('/navigation',function(req,res,next) {
  var Navigation = dataProvider.Navigation;
  Navigation.add(req.body).then(function(navigation) {
    res.json(navigation);
  }).catch(function(error) {
    res.json({error : error});
  });
});

// Update a navigation link.
router.put('/navigation/:id',function(req,res,next) {
  var Navigation = dataProvider.Navigation;
  Navigation.update(req.body).then(function(navigation) {
    res.json(navigation);
  }).catch(function(error) {
    res.json({error : error});
  });
});

// Delete a navigation link.
router.delete('/navigation/:id',function(req,res,next) {
  var Navigation = dataProvider.Navigation;
  Navigation.remove(req.params.id).then(function(navigation) {
    res.json(navigation);
  }).catch(function(error) {
    res.json({error : error});
  });
});

// ---- Shares. ----

// Get all shares.
router.get('/shares',function(req,res,next) {
  var Shares = dataProvider.Shares;
  new Shares().findOne().then(function(shares) {
    res.json(shares);
  }).catch(function(error) {
    res.json([]);
  });
});

// Create a share.
router.post('/shares',function(req,res,next) {
  var Share = dataProvider.Share;
  new Share().add(req.body).then(function(share) {
    res.json(share);
  }).catch(function(error) {
    res.json({message : error});
  });
});



// Delete a share.
router.delete('/shares/:id',function(req,res,next) {
  var Share = dataProvider.Share;
  new Share().remove(req.params.id).then(function(share) {
    res.json(share);
  }).catch(function(error) {
    res.json({message : error});
  });
});

// ---- Invalid routes. ----

router.use(function (req, res, next) {
    res.send('Welcome to the REST API zone!');
});

module.exports = router;
