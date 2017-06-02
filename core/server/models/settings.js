var leafBookshelf = require('./base'),

Setting,
Settings;

Setting = leafBookshelf.Model.extend({

  tableName : 'settings'



});

Settings = leafBookshelf.Collection.extend({
  model : Setting
});

module.exports = {
  Setting : leafBookshelf.model('Setting',Setting),
  Settings : leafBookshelf.model('Settings',Settings)
};