var express = require('express'),
os = require('os'),
semver = require('semver'),

config = require('../../config'),
utils = require('../../utils'),
packageData = require('../../../../package.json'),

router = express.Router();

router

// Get system informations.
.get('/system',function(req,res,next) {
  var platform = os.platform();
  var name = 'Unknown';
  switch (platform) {

    case 'linux':
    name = 'Linux';
    break;

    case 'win32':
    name = 'Microsoft Windows';
    break;

    case 'darwin':
    name = 'Apple MacOS';
    break;

    case 'freebsd':
    name = 'FreeBSD';
    break;

    case 'openbsd':
    name = 'OpenBSD';
    break;

    case 'sunos':
    name = 'SunOS';
    break;

    case 'aix':
    name = 'IBM AIX';
    break;

    case 'android':
    name = 'Google Android';
    break;
  }
  var info = {
    url : config.get('url'),
    env : {
      version : semver.valid(process.version),
      modules : packageData.dependencies
    },
    platform : {
      app : packageData.name,
      name :  packageData.org_leaf.name,
      codename : packageData.org_leaf.codename,
      version : packageData.version,
      author : packageData.author,
      license : packageData.license,
      description : packageData.description
    },
    server : {
      host : config.get('server:host'),
      port : config.get('server:port'),
      cpus : os.cpus(),
      memory : {
        total : os.totalmem(),
        free : os.freemem()
      },
      os : {
        platform : platform,
        name : name,
        release : os.release()
      },
      hostname : os.hostname(),
      database : config.get('database:client')
    }
  };
  res.json(info);
})

// Get a slugs.
.post('/slug',function(req,res,next) {
  res.send(utils.slugify(req.body.s));
});

module.exports = router;