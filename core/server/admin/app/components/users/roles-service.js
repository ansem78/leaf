angular.module('Leaf')

.factory('rolesService',['$rootScope','$http',function($rootScope,$http) {

  return {

    // Return the API URL.
    apiUrl : function() {
      return $rootScope.siteUrl + '/api/roles';
    },

    // Get all roles.
    find : function() {
      return $http.get(this.apiUrl()).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Insert a role.
    create : function(role) {
      return $http.post(this.apiUrl(),role).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    }

  };

}]);