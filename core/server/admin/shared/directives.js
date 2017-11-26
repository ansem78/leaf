angular.module('Leaf')

// Block user input if a field content length is more than the maximum given length.
.directive('maxInput',[function() {
  return {
    restrict : 'A',
    replace : true,
    scope : {
      maxInput : '='
    },
    link : function(scope,element,attrs) {

      var allowed = [8,16,17,18,19,20,27,33,34,35,36,37,38,39,40,46,91,92,93,112,113,114,115,116,117,118,119,120,121,122,123,144,145];

      var mode = attrs.maxInputMode || '';

      element.bind('keydown',function(event) {

        var value = element[0].value.trim();
        if (mode==='words') value = value.split(/\s+/g);

        if (scope.maxInput>0 && value.length===scope.maxInput) {
          if (allowed.indexOf(event.keyCode)<0) {
            event.preventDefault();
            return false;
          }
        }

      });

    }
  }

}]);

