angular.module('Leaf')

.controller('editorController',['$rootScope','$scope',function($rootScope,$scope) {

    // Set editor views.
    $scope.views = [
      {id : 'markdown',name : 'Markdown'},
      {id : 'preview',name : 'Preview'}
    ];

    // Set active editor view.
    $scope.setActiveView = function(view) {
      $scope.activeView = view;
      $('.editor-panel').css('z-index','1');
      $('#editor-' + $scope.activeView.id).css('z-index','2');
    };

    $scope.setActiveView($scope.views[0]);

    // Initialize editor content editable.
    $scope.initEditor = function() {
      $('#editor-markdown .editor-panel-content').prop('contenteditable',true);
    };





}]);