define(['angular'],function(angular) {

  var app = angular.module('Leaf');

  app.register.controller('sharesController',['$rootScope','$scope','$http',function($rootScope,$scope,$http) {

    $scope.sortableOptions = {
      axis : 'y',
      handle : '.drag',
      update : function(e,ui) {

      }
    };

    $scope.initNewItem = function() {
      $scope.item = null;
    };

    $scope.browse = function() {
      $scope.items = [];
      $scope.initNewItem();
      $http.get($rootScope.siteUrl + '/api/shares').then(function(response) {
        $scope.items = response.data;
      });
      /*$scope.items = [
        {id : 'aaaaaaaaaaaaaaaaaaaaaaaa',name : 'Facebook',position : 0,url : 'https://facebook.com/sharer/?t={{title}}&url={{url}}'},
        {id : 'aaaaaaaaaaaaaaaaaaaaaaab',name : 'LinkedIn',position : 1,url : 'https://linkedin.com/share/?title={{title}}'},
        {id : 'aaaaaaaaaaaaaaaaaaaaaaac',name : 'Google +',position : 2,url : 'https://plus.google.com/share/?title={{title}}&url={{url}}'},
        {id : 'aaaaaaaaaaaaaaaaaaaaaaad',name : 'Skyrock',position : 3,url : 'http://skyrock.com/m/blog/share-widget.php?title={{title}}'}
      ];*/
    };

    $scope.browse();

    $scope.add = function() {
      $scope.item.position = $scope.items.length;
      $http.post($rootScope.siteUrl + '/api/shares',$scope.item).then(function(response) {
        if (response.status==200 && !response.data.message) {
          $scope.items.push(item);
          $scope.initNewItem();
        }
      });
    };

    $scope.update = function(item) {

    };

    $scope.remove = function(item) {
      $http.delete($rootScope.siteUrl + '/api/shares/' + item.id).then(function(response) {
        if (response.status==200 && !response.data.message) {
          angular.forEach($scope.items,function(i,n) {
            if (angular.equals(item,i)) {
              $scope.items.splice(n,1);
              return;
            }
          });
        }
      });
    };

  }]);

});