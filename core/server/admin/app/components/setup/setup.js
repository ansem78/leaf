define(['angular'],function(angular) {

  var app = angular.module('Leaf');

  app.register.controller('setupController',['$rootScope','$scope','$http','$state',function($rootScope,$scope,$http,$state) {



    // Installa il sito.
    $scope.setup = function() {
      if ($scope.form.$valid)  {

      }
    };



  }]);

});