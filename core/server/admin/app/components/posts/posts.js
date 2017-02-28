define(['angular'],function(angular) {

  var app = angular.module('Leaf');

  app.register.controller('postsController',['$rootScope','$scope',function($rootScope,$scope) {

    $scope.browse = function() {
      $scope.posts = [];
      for (var i=300; i>=1; i--) {
        $scope.posts.push({
          id : i,
          title : 'Titolo articolo ' + i + '. Può essere molto lungo...',
          date : '2017-02-02T20:56:16',
          status : 'draft',
          author : {
            fullname : 'Alexandro Morato',
            email : 'ale@ffhorizon.it'
          }
        });
      }
    };

    $scope.browse();




  }]);

});