define(['angular'],function(angular) {

  var app = angular.module('Leaf');

  app.register.factory('navigationService',['$rootScope','$http',function($rootScope,$http) {

    var self = {};

    // Initialize a new navigation link with base default values.
    self.init = function() {
      return {
        id : '',
        name : '',
        url : '',
        position : 0
      };
    };

    // Get all navigation links.
    self.all = function() {
      return $http.get($rootScope.siteUrl + '/api/navigation').then(function(res) {
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

    // Add navigation link.
    self.add = function(navigation) {
      return $http.post($rootScope.siteUrl + '/api/navigation',navigation).then(function(res) {
        if (res.status!==200) {
          console.log(res.statusText);
          return null;
        }
        else if (res.data.error) {
          console.log(res.data.error);
          return null;
        }
        return res.data;
      });
    };

    // Update navigation link.
    self.update = function(navigation) {
      return $http.put($rootScope.siteUrl + '/api/navigation/' + navigation.id,navigation).then(function(res) {
        if (res.status!==200) {
          console.log(res.statusText);
          return null;
        }
        else if (res.data.error) {
          console.log(res.data.error);
          return null;
        }
        return res.data;
      });
    };

    // Delete navigation link.
    self.remove = function(id) {
      return $http.delete($rootScope.siteUrl + '/api/navigation/' + id).then(function(res) {
        if (res.status!==200) {
          console.log(res.statusText);
          return false;
        }
        else if (res.data.error) {
          console.log(res.data.error);
          return false;
        }
        return id;
      });
    };

    return self;

  }]);

});