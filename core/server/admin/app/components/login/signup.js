define(['angular'],function(angular) {

  var app = angular.module('Leaf');

  app.register.controller('signupController',['$rootScope','$scope','$http',function($rootScope,$scope,$http) {



    // Registra un nuovo utente.
    $scope.signup = function() {
      const f = $scope.form;
      if (f.fullname.$error.required) $rootScope.alert('danger','<p>The full name is empty.</p>');
      else if (f.email.$error.required || f.email.$error.email) $rootScope.alert('danger','<p>The e-mail address is invalid.</p>');
      else if (f.password.$error.required || f.password.$error.minlength) $rootScope.alert('danger','<p>The password must be at least 8 characters long.</p>');
      else {

      }
    };



  }]);

});