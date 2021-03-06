var express = require('express'),
bodyParser = require('body-parser'),
cookieSession = require('cookie-session'),
i18n = require('i18n'),
hbs = require('express-hbs'),
favicon = require('serve-favicon'),
netjet = require('netjet'),
config = require('./core/server/config'),
utils = require('./core/server/utils'),
LeafServer = require('./core/server/server'),

app = express();

// Configure i18n.
i18n.configure({
  directory : __dirname + '/' + config.get('paths:corePath') + '/server/locales',
  autoReload : true,
  api : {
    '__' : 't',
    '__n' : 'tn'
  }
});

// Configure middlewares.
app.use(cookieSession({
  name : 'leafSession',
  secret : config.get('secret'),
  maxAge : utils.time.DAY_IN_MILLISECONDS
}));
app.use(netjet());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(i18n.init);
app.use(favicon(__dirname + '/favicon.ico'));

// Configure Handlebars.
app.engine('hbs',hbs.express4({
    //defaultLayout : config.get('paths:contentPath') + '/themes/default/index',
    layoutsDir : config.get('paths:contentPath') + '/themes/default',
    partialsDir : config.get('paths:contentPath') + '/themes/default/partials'
}));

app.set('view engine','hbs');
app.set('views',config.get('paths:contentPath') + '/themes/default');

// App API routes.
app.use('/api',require(__dirname + '/' + config.get('paths:corePath') + '/server/routes/api'));

// App static administration & modules routes.
app.use('/admin/app',express.static(__dirname + '/' + config.get('paths:corePath') + '/server/admin/app'));
app.use('/admin/assets',express.static(__dirname + '/' + config.get('paths:corePath') + '/server/admin/assets'));
app.use('/node_modules',express.static(__dirname + '/node_modules'));

// App administration routes.
app.use('/admin',require(__dirname + '/' + config.get('paths:corePath') + '/server/routes/admin'));

// App public (site) routes.
app.use('/',require(__dirname + '/' + config.get('paths:corePath') + '/server/routes/site'));

var server = new LeafServer().start(app);