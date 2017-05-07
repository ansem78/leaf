define(['angular'],function(angular) {

  var app = angular.module('Leaf');

  app.register.controller('loginController',['$rootScope','$scope','$http','$state',function($rootScope,$scope,$http,$state) {

    $scope.user.email = '';

    $scope.user.password = '';

    $scope.error = false;

    // Esegue il login.
    $scope.login = function() {

      const data = {
        email : $scope.user.email,
        password : $scope.user.password
      };

      $http.post($rootScope.siteUrl + '/api/login',data).then(function(response) {
        if (response) $state.go('dashboard');
        else $scope.error = true;
      });

    };



  }]);

});