define(['angular'],function(angular) {

  var app = angular.module('Leaf');

  app.register.controller('settingsController',['$rootScope','$scope','$filter','settingService',function($rootScope,$scope,$filter,settingService) {

    // Load all avatars.
    $scope.avatars = settingService.avatars();

    // Load all avatar ratings.
    $scope.ratings = settingService.ratings();

    // Load all core settings.
    $scope.load = function() {
      $scope.settings = {};
      settingService.all().then(function(settings) {
        if (settings) $scope.settings = $filter('filter')(settings,{type : 'core'});
      });
    };

    $scope.load();



  }]);

});