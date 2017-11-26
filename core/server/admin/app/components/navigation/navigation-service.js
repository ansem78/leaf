angular.module('Leaf')

.factory('navigationService',['$rootScope','$http',function($rootScope,$http) {

  return {

    // Return the API URL.
    apiUrl : function() {
      return $rootScope.siteUrl + '/api/navigation';
    },

    // Get all navigation links.
    find : function() {
      return $http.get(this.apiUrl()).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Get a navigation link.
    get : function(id) {
      return $http.get(this.apiUrl() + '/' + id).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Add a navigation link.
    create : function(navigation) {
      return $http.post(this.apiUrl(),navigation).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Update a navigation link.
    update : function(navigation) {
      return $http.put(this.apiUrl(),navigation).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Delete a navigation link.
    remove : function(id) {
      return $http.delete(this.apiUrl() + '/' + id).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    }

  };

}]);