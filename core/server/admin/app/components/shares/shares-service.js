angular.module('Leaf')

.factory('sharesService',['$rootScope','$http',function($rootScope,$http) {

  return {

    // Return the API URL.
    apiUrl : function() {
      return $rootScope.siteUrl + '/api/shares';
    },

    // Get all shares.
    find : function() {
      return $http.get(this.apiUrl()).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Get a share.
    get : function(id) {
      return $http.get(this.apiUrl() + '/' + id).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Insert a share.
    create : function(share) {
      return $http.post(this.apiUrl(),share).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Update a share.
    update : function(share) {
      return $http.put(this.apiUrl(),share).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Delete a share.
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