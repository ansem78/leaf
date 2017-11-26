var express = require('express'),
_ = require('lodash'),
fs = require('fs-extra'),

config = require('../../config'),

router = express.Router();

router

// Get all installed themes.
.get('/',function(req,res,next) {
  var themes = [];
  var path = config.get('paths:contentPath') + '/themes';
  var dirs = fs.readdirSync(path);
  _.each(dirs,function(dir) {

    try {
      var fh = fs.openSync(path + '/' + dir + '/index.json','r');

      var data = fs.readFileSync(fh,{encoding : 'utf-8',flag : 'r'});
      if (data) {
        try {
          data = JSON.parse(data);

          data = _.defaults(data,{name : dir,version : '1.0.0',author : 'Unknown',license : 'Unknown'});

          data.id = dir;

          themes.push(data);
        }
        catch (err) {
          console.error(err);
        }
      }

    }
    catch (err) {
      console.error(err);
    }

  });
  res.json(themes);
});

module.exports = router;