define(['angular'],function(angular) {

  var app = angular.module('Leaf');

  app.register.controller('userController',['$rootScope','$scope','$stateParams',function($rootScope,$scope,$stateParams) {

    $scope.views = [
      {
        id : 'profile',
        title : 'Profile',
        icon : 'user'
      },
      {
        id : 'account',
        title : 'Account settings',
        icon : 'gear'
      },
      {
        id : 'stats',
        title : 'Stats',
        icon : 'bars'
      }
    ];

    $scope.activeView = $scope.views[0].id;

    $scope.setActiveView = function(id) {
      $scope.activeView = id;
    };

    $scope.isActiveView = function(id) {
      return $scope.activeView===id;
    };

    $scope.user = {
      description : '',
      email : 'ale@ffhorizon.it',
      fullname : 'Alexandro Morato',
      id : 1,
      location : 'Padova',
      registered : '2017-01-30T20:13:42',
      role : {
        id : 1,
        name : 'Owner',
        slug : 'owner'
      },
      url : ''
    };



  }]);

});