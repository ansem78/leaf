define(['angular'],function(angular) {

  var app = angular.module('Leaf');

  app.register.controller('sharesController',['$rootScope','$scope',function($rootScope,$scope) {

    $scope.initNewItem = function() {
      $scope.item = {label : '',url : ''};
    };

    $scope.initNewItem();

    $scope.browse = function() {
      $scope.items = [];
      $scope.items = [
        {id : 1,label : 'Twitter',slug : 'twitter',order : 1,url : 'https://twitter.com/share?t={{title}}'},
        {id : 2,label : 'Facebook',slug : 'facebook',order : 2,url : 'https://fachebook.com/sharer/?t={{title}}&url={{url}}'},
        {id : 3,label : 'LinkedIn',slug : 'linkedin',order : 3,url : 'https://linkedin.com/share/?title={{title}}'},
        {id : 4,label : 'Google +',slug : 'google',order : 4,url : 'https://plus.google.com/share/?title={{title}}&url={{url}}'},
        {id : 5,label : 'Skyrock',slug : 'skyrock',order : 5,url : 'http://skyrock.com/m/blog/share-widget.php?title={{title}}'}
      ];
    };

    $scope.browse();

    $scope.add = function() {
      if ($scope.item.label.trim() && $scope.item.slug.trim() && $scope.item.url.trim()) $scope.items.push($scope.item);
      $scope.initNewItem();
    };

    $scope.update = function(item) {

    };

    $scope.remove = function(item) {
      for (var i=0; i<$scope.items.length; i++) {
        if ($scope.items[i].id===item.id) {
          $scope.items.splice(i,1);
          break;
        }
      }
    };

  }]);

});