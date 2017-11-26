angular.module('Leaf')

.controller('tagsController',['$rootScope','$scope','$filter','tagsService',function($rootScope,$scope,$filter,tagsService) {

  // Set active tag.
  $scope.setActiveTag = function(tag) {
    $scope.activeTag = (tag)? angular.copy(tag) : null;
  };

  // Filter a tag by name.
  $scope.filterTag = function(item) {
    if (!$rootScope.search) return true;
    var s = $rootScope.search.toLowerCase();
    return item.name.toLowerCase().indexOf(s)>-1;
  };

   // Initialize a new tag.
  $scope.initTag = function() {
    $scope.setActiveTag({name : '',slug : '',description : ''});
  };

  // Load all tags.
  $scope.loadTags = function() {
    $scope.setActiveTag();
    $scope.tags = [];
    tagsService.find().then(function(res) {
      if (res.status===200) $scope.tags = $filter('orderBy')(res.data,'name');
    });
  };

  $scope.loadTags();

  // Get the slug based on tag name.
  $scope.slugify = function(event) {
    if (!$filter('isNpc')(event.keyCode)) {
      tagsService.slugify($scope.activeTag.name).then(function(res) {
        if (res.status===200) $scope.activeTag.slug = res.data;
      });
    }
  };

  // Add a tag.
  $scope.addTag = function() {
    $rootScope.hideSidebar();
    tagsService.create($scope.activeTag).then(function(res) {
      if (res.status===200) {

        tagsService.get(res.data.id).then(function(res) {

          if (res.status===200) {
            $scope.tags.push(res.data);
            $scope.tags = $filter('orderBy')($scope.tags,'name');
            $scope.setActiveTag();
          }

        });

      }
    });
  };

  // Update a tag.
  $scope.updateTag = function() {
    $rootScope.hideSidebar();
    tagsService.update($scope.activeTag).then(function(res) {
      if (res.status===200) {

        tagsService.get(res.data.id).then(function(res) {

          if (res.status===200) {

            for (var i=0; i<$scope.tags.length; i++) {
              if ($scope.tags[i].id===res.data.id) {
                $scope.tags[i] = res.data;
                $scope.tags = $filter('orderBy')($scope.tags,'name');
                $scope.setActiveTag();
                return;

              }
            }

          }

        });

      }

    });
  };

  // Delete a tag.
  $scope.removeTag = function() {
    $rootScope.hideSidebar();
    var id = $scope.activeTag.id;
    tagsService.remove(id).then(function(res) {
      if (res.status===200) {
        for (var i=0; i<$scope.tags.length; i++) {
          if ($scope.tags[i].id===id) {
            $scope.tags.splice(i,1);
            $scope.setActiveTag();
            $('#delete-tag-modal').modal('hide');
            return;
          }
        }
      }
    });
  };

}]);