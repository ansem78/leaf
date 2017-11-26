angular.module('Leaf')

.controller('setupController',['$rootScope','$scope','$state','setupService',function($rootScope,$scope,$state,setupService) {

  $scope.initSetup = function() {
    $scope.setup = {
      site_name : 'Nome sito',
      name : 'Nome proprietario',
      email : 'owner@sitename.it',
      password : 'password'
    };
  };

  $scope.initSetup();

  // Installa il sito.
  $scope.runSetup = function() {
    setupService.run($scope.setup).then(function(res) {
      if (res.status===200) $state.go('login');
      else $rootScope.setMessage(res.data.message);
    });
  };



}]);