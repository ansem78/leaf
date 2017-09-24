define(['angular'],function(angular) {

  var app = angular.module('Leaf');

  app.register.factory('settingService',['$rootScope','$http',function($rootScope,$http) {

    var self = {};

    // Init all avatars.
    self.avatars = function() {
      return [
        {id : 'mm',name : 'Mistery man'},
        {id : '',name : 'Gravatar logo'},
        {id : 'blank',name : 'Blank'},
        {id : 'identicon',name : 'Identicon (generated)'},
        {id : 'monsterid',name : 'MonsterID (generated)'},
        {id : 'wavatar',name : 'Wavatar (generated)'},
        {id : 'retro',name : 'Retro (generated)'}
      ];
    };

    // Init all avatar ratings.
    self.ratings = function() {
      return [
        {id : 'g',name : 'G: suitable for all audiences.'},
        {id : 'pg',name : 'PG: possibly offensive. Usually for audiences 13 and above.'},
        {id : 'r',name : 'R: intended for adult audiences above 17.'},
        {id : 'x',name : 'X: even more mature than above.'}
      ];
    };

    // Get all settings.
    self.all = function() {
      return $http.get($rootScope.siteUrl + '/api/settings').then(function(res) {
        if (res.status!==200) {
          console.log(res.statusText);
          return [];
        }
        else if (res.data.error) {
          console.log(res.data.error);
          return [];
        }
        return res.data;
      });
    };



    return self;

  }]);

});