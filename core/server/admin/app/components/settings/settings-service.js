angular.module('Leaf')

.factory('settingsService',['$rootScope','$http',function($rootScope,$http) {

  return {

    // Return the API URL.
    apiUrl : function() {
      return $rootScope.siteUrl + '/api/settings';
    },

    // Get all settings.
    find : function() {
      return $http.get(this.apiUrl()).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Insert a setting.
    create : function(setting) {
      return $http.post(this.apiUrl(),setting).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Update a setting.
    update : function(setting) {
      return $http.put(this.apiUrl(),setting).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Update all settings.
    updateAll : function(settings) {
      return $http.put(this.apiUrl(),settings).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Delete a setting.
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