var chalk = require('chalk'),

config = require('./config');

function LeafServer() {
  this.httpServer = null;

  // Expose config module for use externally.
  this.config = config;
}

LeafServer.prototype.start = function(app) {
    console.log('Starting...');

    var self = this;

    var port = process.env.PORT || config.get('server:port');

    self.httpServer = app.listen(port,config.get('server:host'),function() {
        console.log(chalk.green('App listening at %s on port %d.'),self.httpServer.address().address,self.httpServer.address().port);
    });
};

module.exports = LeafServer;