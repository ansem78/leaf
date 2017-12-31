angular.module('Leaf')

.controller('setupController',['$rootScope','$scope','$state','setupService',function($rootScope,$scope,$state,setupService) {
console.log(setup controller)
  $scope.initSetup = function() {
      console.log('initSetup')
    $scope.setup = {
      site_name : 'Nome sito',
      name : 'Nome proprietario',
      email : 'owner@sitename.it',
      password : 'password'
    };
  };
  console.log('init setup')
  $scope.initSetup();

  // Installa il sito.
  $scope.runSetup = function() {
      console.log('runsetup');
    setupService.run($scope.setup).then(function(res) {
        console.log)('then runsetup',res)
      if (res.status===200) $state.go('login');
      else $rootScope.setMessage(res.data.message);
    });
  };



}];
