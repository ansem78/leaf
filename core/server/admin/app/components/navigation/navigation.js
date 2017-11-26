angular.module('Leaf')

.controller('navigationController',['$rootScope','$scope','$filter','$timeout','navigationService',function($rootScope,$scope,$filter,$timeout,navigationService) {

  // Configure Angular UI Sortable.
  $scope.sortableOptions = {
    axis : 'y',
    handle : '.drag',
    stop : function(event,ui) {
      for (var i=0; i<$scope.items.length; i++) {
        $scope.items[i].position = i;
        $scope.update($scope.items[i]);
      }
    }
  };

  // Set the new navigation link URL to the site URL when the URL field is focused.
  $('#item_url').on('focus',function() {
    var t = $(this);
    if (!$.trim(t.val())) {
      var v = t.attr('placeholder');
      t.val(v);
      $scope.newItem.url = v;
      $timeout(function() {
        var p = v.length;
        document.getElementById('item_url').setSelectionRange(p,p);
      },50);
    }
  });

  // Initialize a new navigation link.
  $scope.initItem = function() {
    $scope.newItem = {
      name : '',
      url : ''
    };
  };

  $scope.initItem();

  // Load all navigation links.
  $scope.load = function() {
    $scope.items = [];
    navigationService.find().then(function(res) {
      if (res.status===200) $scope.items = $filter('orderBy')(res.data,'position');
    });
  };

  $scope.load();

  // Add a navigation link.
  $scope.add = function() {
    $scope.newItem.position = $scope.items.length;
    navigationService.create($scope.newItem).then(function(res) {
      if (res.status===200) {

        navigationService.get(res.data.id).then(function(res) {

          if (res.status===200) {
            $scope.items.push(res.data);
            $scope.initItem();
            $('#item_name').focus();
          }

        });

      }
    });
  };

  // Update a navigation link.
  $scope.update = function(navigation) {
    navigationService.update(navigation);
  };

  // Delete a navigation link.
  $scope.remove = function(id) {
    navigationService.remove(id).then(function(res) {
      if (res.status===200) {
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