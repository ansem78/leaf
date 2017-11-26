angular.module('Leaf')

.controller('sharesController',['$rootScope','$scope','$filter','sharesService',function($rootScope,$scope,$filter,sharesService) {

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

  // Initialize a new navigation link.
  $scope.initItem = function() {
    $scope.newItem = {
      name : '',
      url : ''
    };
  };

  $scope.initItem();

  // Load all shares.
  $scope.load = function() {
    $scope.items = [];
    sharesService.find().then(function(res) {
      if (res.status===200) $scope.items = $filter('orderBy')(res.data,'position');
    });
  };

  $scope.load();

  // Add a share.
  $scope.add = function() {
    $scope.newItem.position = $scope.items.length;
    sharesService.create($scope.newItem).then(function(res) {
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

  // Update a share.
  $scope.update = function(share) {
    sharesService.update(share);
  };

  // Delete a share.
  $scope.remove = function(id) {
    sharesService.remove(id).then(function(res) {
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