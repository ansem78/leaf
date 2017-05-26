const Nconf = require('nconf');
const nconf = new Nconf.Provider();
const env = process.env.NODE_ENV || 'development';

nconf.argv();

nconf.env({
  separator : '__'
});

nconf.file('leaf',__dirname + '/config.json');

nconf.set('env',env);

module.exports = nconf;