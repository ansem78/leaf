angular.module('Leaf')

.factory('setupService',['$rootScope','$http',function($rootScope,$http) {

  return {

    // Return the API URL.
    apiUrl : function() {
      return $rootScope.siteUrl + '/api/setup';
    },

    // Run setup.
    run : function(data) {
      return $http.post(this.apiUrl(),data).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    }

  };

}]);