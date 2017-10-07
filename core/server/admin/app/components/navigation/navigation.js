define(['angular'],function(angular) {

  var app = angular.module('Leaf');

  app.register.controller('navigationController',['$rootScope','$scope','$filter','$timeout','navigationService',function($rootScope,$scope,$filter,$timeout,navigationService) {

    // Configure Angular UI Sortable.
    $scope.sortableOptions = {
      axis : 'y',
      handle : '.drag',
      update : function(event,ui) {
        for (var i=0; i<$scope.items.length; i++) $scope.update({id : $scope.items[i].id,position : i});
      }
    };

    // Set the new navigation link URL to the site URL when the URL field is focused.
    $('#item-url').on('focus',function() {
      var t = $(this);
      if (!$.trim(t.val())) {
        var v = t.attr('placeholder');
        t.val(v);
        $scope.newItem.url = v;
        $timeout(function() {
          var p = v.length;
          document.getElementById('item-url').setSelectionRange(p,p);
        },50);
      }
    });

    // Initialize a new navigation link.
    $scope.initItem = function() {
      $scope.newItem = navigationService.init();
    };

    $scope.initItem();

    // Load all navigation links.
    $scope.load = function() {
      $scope.items = [];
      navigationService.all().then(function(res) {
        $scope.items = $filter('orderBy')(res,'position');
      });
    };

    $scope.load();

    // Add a navigation link.
    $scope.add = function() {
      $scope.newItem.position = $scope.items.length;
      navigationService.add($scope.newItem).then(function(res) {
        if (res.error) console.log(res.error);
        else if (res) {
          $scope.items.push(res);
          $scope.initItem();
          $('#item-name').focus();
        }
      });
    };

    // Update a navigation link.
    $scope.update = function(navigation) {
      navigationService.update(navigation).then(function(res) {
        if (res.error) console.log(res.error);
      });
    };

    // Delete a navigation link.
    $scope.remove = function(id) {
      navigationService.remove(id).then(function(res) {
        if (res.error) console.log(res.error);
        else if (res) {
          for (var i=0; i<$scope.items.length; i++) {
            if ($scope.items[i].id===id) {
              $scope.items.splice(i,1);
              return;
            }
          }
        }
      });
    };


  }]);

});