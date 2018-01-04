var https = require('https'),
http = require('http'),
chalk = require('chalk'),

config = require('./config');

function LeafServer() {
  this.httpServer = null;

  // Expose config module for use externally.
  this.config = config;
}

LeafServer.prototype.start = function(app) {
    console.log('Starting...');

    var self = this;

    var listening = function() {
        console.log(chalk.green('App listening at %s on port %d.'),self.httpServer.address().address,self.httpServer.address().port);
    };

    var protocol = /^https?/i.exec(config.get('url')) || 'http';

    var port = process.env.PORT || config.get('server:port');

    var host = config.get('server:host');

    var options = {};

    self.httpServer = (protocol==='https')? https.createServer(options,app).listen(port,host,listening) : http.createServer(app).listen(port,host,listening);
};

module.exports = LeafServer;