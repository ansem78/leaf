define(['angular'],function(angular) {

  var app = angular.module('Leaf');

  app.register.controller('loginController',['$rootScope','$scope','$http','$state',function($rootScope,$scope,$http,$state) {

    $scope.error = false;

    // Esegue il login.
    $scope.login = function() {
      const f = $scope.form;
      if (f.email.$error.required || f.email.$error.email) $rootScope.alert('danger','<p>The e-mail address is invalid.</p>');
      else if (f.password.$error.required) $rootScope.alert('danger','<p>The password is empty.</p>');
      else {
        $http.post($rootScope.siteUrl + '/api/login',$scope.user).then(function(response) {
          if (response) $state.go('dashboard');
          else $rootScope.alert('danger','<p>Empty credentials. <a href="lost-password/">Lost your password?</a></p>');
        });
      }
    };



  }]);

});