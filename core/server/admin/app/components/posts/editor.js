define(['angular'],function(angular) {

  var app = angular.module('Leaf');

  app.register.controller('editorController',['$rootScope','$scope',function($rootScope,$scope) {

    // Initialize editor controls.
    $scope.initEditor = function() {
      $('#editor-markdown .editor-panel-content').prop('contenteditable',true);

      $('body').on('click','#editor-controls ul button',function() {
          var b = $(this);
          var i = $('#editor-controls ul button').index(b);
          $('.editor-panel').css('z-index','1');
          $('.editor-panel').eq(i).css('z-index','2');
          $('#editor-controls ul button').removeClass('active');
          b.addClass('active');
      });
    };



  }]);

});