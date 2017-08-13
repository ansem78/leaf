define(['angular'],function(angular) {

  var app = angular.module('Leaf');

  app.register.controller('navigationController',['$rootScope','$scope','$http','$timeout',function($rootScope,$scope,$http,$timeout) {

    // Configure Angular UI Sortable.
    $scope.sortableOptions = {
      axis : 'y',
      handle : '.drag',
      update : function(event,ui) {

      }
    };

    // Set the new navigation link URL to the site URL when pressing TAB.
    $('#item-url').on('focus',function() {
      var e = $(this);
      var v = e.attr('placeholder');
      e.val(v);
      $scope.newItem.url = v;
      $timeout(function() {
        var p = v.length;
        document.getElementById('item-url').setSelectionRange(p,p);
      },50);
    });

    // Initialize a new navigation link.
    $scope.initNewItem = function() {
      $scope.newItem = {name : '',url : ''};
    };

    $scope.initNewItem();

    // Load all navigation links.
    $scope.browse = function() {
      $scope.items = [];
      /*$scope.items = [
        {id : 1,name : 'Home',slug : 'home',position: 1,url : 'http://igiardinidiringford.it/'},
        {id : 2,name : 'About',slug : 'about',position : 2,url : 'http://igiardinidiringford.it/about/'},
        {id : 3,name : 'Lifestream',slug : 'lifestream',position : 3,url : 'http://igiardinidiringford.it/lifestream/'},
        {id : 4,name : 'Contatti',slug : 'contacts',position : 4,url : 'http://igiardinidiringford.it/contacts/'}
      ];*/
    };

    $scope.browse();

    // Add a navigation link.
    $scope.add = function() {
      if ($scope.newItem.name && $scope.newItem.url) {
        $http.post($rootScope.siteUrl + '/api/navigation',$scope.newItem).then(function(response) {
          if (!response.data.error) {
            $scope.items.push(response.data);
            $scope.initNewItem();
          }
        });
      }
    };

    // Update a navigation link.
    $scope.update = function(item) {

    };

    // Delete a navigation link.
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