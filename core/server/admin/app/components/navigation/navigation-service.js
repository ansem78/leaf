define(['angular'],function(angular) {

  var app = angular.module('Leaf');

  app.register.factory('navigationService',['$rootScope','$http',function($rootScope,$http) {

    var self = {};

    // Return the API URL.
    self.apiUrl = function(id) {
      var url = $rootScope.siteUrl + '/api/navigation';
      return (id)? [url,id].join('/') : url;
    };

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
      return $http.get(self.apiUrl()).then(function(res) {
        return (res)? res.data : [];
      });
    };

    // Add navigation link.
    self.add = function(navigation) {
      return $http.post(self.apiUrl(),navigation).then(function(res) {
        return (res)? res.data : null;
      });
    };

    // Update navigation link.
    self.update = function(navigation) {
      return $http.put(self.apiUrl(navigation.id),navigation).then(function(res) {
        return (res)? res.data : null;
      });
    };

    // Delete navigation link.
    self.remove = function(id) {
      return $http.delete(self.apiUrl(id)).then(function(res) {
        return (res)? res.data : null;
      });
    };

    return self;

  }]);

});