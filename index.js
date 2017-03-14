const config = require('./core/server/config');
const express = require('express');
const hbs = require('express-hbs');
const favicon = require('serve-favicon');
const netjet = require('netjet');
const chalk = require('chalk');

const app = express();

app.use(netjet());

app.use(favicon(__dirname + '/favicon.ico'));

app.use('/admin',express.static(__dirname + '/core/server/admin'));

app.engine('hbs',hbs.express4({
  defaultLayout : config.get('paths:contentPath') + '/themes/default/default',
  layoutsDir : config.get('paths:contentPath') + '/themes/default',
  partialsDir : config.get('paths:contentPath') + '/themes/default/partials'
}));

app.set('view engine','hbs');
app.set('views',config.get('paths:contentPath') + '/themes/default');

const api = require(__dirname + '/core/server/routes/api');
app.use('/api',api);

const site = require(__dirname + '/core/server/routes/site');
app.use('/',site);

const admin = require(__dirname + '/core/server/routes/admin');
app.use('/admin',admin);

const port = process.env.PORT || config.get('server:port');

const server = app.listen(port,config.get('server:host'),function() {
  console.log(chalk.green('App listening at %s on port %d.'),server.address().address,server.address().port);
});
