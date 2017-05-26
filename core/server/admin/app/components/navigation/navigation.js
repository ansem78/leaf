define(['angular'],function(angular) {

  var app = angular.module('Leaf');

  app.register.controller('navigationController',['$rootScope','$scope','$timeout',function($rootScope,$scope,$timeout) {

    $('#add-url').on('focus',function() {
      var e = $(this);
      var v = e.attr('placeholder');
      e.val(v);
      $scope.item.url = v;
      $timeout(function() {
        var p = v.length;
        document.getElementById('add-url').setSelectionRange(p,p);
      },50);
    });

    $scope.initNewItem = function() {
      $scope.item = {label : '',url : ''};
    };

    $scope.initNewItem();

    $scope.browse = function() {
      $scope.items = [];
      $scope.items = [
        {id : 1,label : 'Home',slug : 'home',order : 1,url : 'http://igiardinidiringford.it/'},
        {id : 2,label : 'About',slug : 'about',order : 2,url : 'http://igiardinidiringford.it/about/'},
        {id : 3,label : 'Lifestream',slug : 'lifestream',order : 3,url : 'http://igiardinidiringford.it/lifestream/'},
        {id : 4,label : 'Contatti',slug : 'contacts',order : 4,url : 'http://igiardinidiringford.it/contacts/'}
      ];
    };

    $scope.browse();

    $scope.add = function() {
      if ($scope.item.label.trim() && $scope.item.url.trim()) $scope.items.push($scope.item);
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