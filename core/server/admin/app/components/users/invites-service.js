angular.module('Leaf')

.factory('invitesService',['$rootScope','$http',function($rootScope,$http) {

  return {

    // Return the API URL.
    apiUrl : function() {
      return $rootScope.siteUrl + '/api/invites';
    },

    // Get all invites.
    find : function() {
      return $http.get(this.apiUrl()).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Get an invite.
    get : function(id) {
      return $http.get(this.apiUrl() + '/' + id).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Insert an invite.
    create : function(invite) {
      return $http.post(this.apiUrl(),invite).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Update an invite.
    update : function(invite) {
      return $http.put(this.apiUrl(),invite).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Delete an invite.
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