angular.module('Leaf')

.controller('editorController',['$rootScope','$scope',function($rootScope,$scope) {

    // Set editor views.
    $scope.views = [
      {id : 'markdown',name : 'Markdown'},
      {id : 'preview',name : 'Preview'}
    ];

    // Check if a view is the active one.
    $scope.isActiveView = function(id) {
        return $scope.activeView===id;
    };

    // Set the active view.
    $scope.setActiveView = function(id) {
      $scope.activeView = id;
      $('.editor-panel').css('z-index','1');
      $('#editor-' + $scope.activeView).css('z-index','2');
    };

    $scope.setActiveView($scope.views[0].id);







}]);