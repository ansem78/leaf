angular.module('Leaf')

.factory('usersService',['$rootScope','$http',function($rootScope,$http) {

  return {

    // Return the API URL.
    apiUrl : function() {
      return $rootScope.siteUrl + '/api/users';
    },

    // Get all users.
    find : function() {
        console.log('api',this.apiUrl())
      return $http.get(this.apiUrl()).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Get a user.
    get : function(id) {
      return $http.get(this.apiUrl() + '/' + id).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Insert a user.
    create : function(user) {
      return $http.post(this.apiUrl(),user).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Update a user.
    update : function(user) {
      return $http.put(this.apiUrl(),user).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Delete a user.
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
