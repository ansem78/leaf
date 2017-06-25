
var express = require('express'),
bodyParser = require('body-parser'),
i18n = require('i18n'),
hbs = require('express-hbs'),
favicon = require('serve-favicon'),
netjet = require('netjet'),
chalk = require('chalk'),
    
config = require('./core/server/config'),

app;

i18n.configure({
  directory : __dirname + '/' + config.get('paths:corePath') + '/server/locales',
  autoReload : true,
  api : {
    '__' : 't',
    '__n' : 'tn'
  }
});

app = express();

app.use(netjet());

app.use(bodyParser.json());

app.use(i18n.init);

app.use(favicon(__dirname + '/favicon.ico'));

app.use('/admin',express.static(__dirname + '/' + config.get('paths:corePath') + '/server/admin'));

app.engine('hbs',hbs.express4({
    defaultLayout : config.get('paths:contentPath') + '/themes/default/default',
    layoutsDir : config.get('paths:contentPath') + '/themes/default',
    partialsDir : config.get('paths:contentPath') + '/themes/default/partials'
}));

app.set('view engine','hbs');
app.set('views',config.get('paths:contentPath') + '/themes/default');

var api = require(__dirname + '/' + config.get('paths:corePath') + '/server/routes/api');
app.use('/api',api);

var admin = require(__dirname + '/' + config.get('paths:corePath') + '/server/routes/admin');
app.use('/admin',admin);

var site = require(__dirname + '/' + config.get('paths:corePath') + '/server/routes/site');
app.use('/',site);

var launchServer = function() {
    var port = process.env.PORT || config.get('server:port');

    var server = app.listen(port,config.get('server:host'),function() {
        console.log(chalk.green('App listening at %s on port %d.'),server.address().address,server.address().port);
    });
};

launchServer();
