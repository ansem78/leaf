define(['angular'],function(angular) {

  var app = angular.module('Leaf');

  app.register.controller('tagsController',['$rootScope','$scope',function($rootScope,$scope) {

    $scope.browse = function() {
      $scope.tags = [
        {
          id : 1,
          name : 'X-box',
          slug : 'x-box',
          count : 123
        },
        {
          id : 2,
          name : 'Playstation',
          slug : 'playstation',
          count : 32
        },
        {
          id : 3,
          name : 'Wii',
          slug : 'wii',
          count : 8
        },
        {
          id : 4,
          name : 'Console',
          slug : 'console',
          count : 11
        },
        {
          id : 5,
          name : 'Eternal sonata',
          slug : 'eternal-sonata',
          count : 3
        },
        {
          id : 6,
          name : 'Final fantasy',
          slug : 'final-fantasy',
          count : 0
        },
        {
          id : 7,
          name : 'GDR',
          slug : 'gdr',
          count : 14
        }
      ];
    };

    $scope.browse();

  }]);

});