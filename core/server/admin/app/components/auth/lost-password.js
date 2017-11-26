angular.module('Leaf')

.controller('lostpasswordController',['$rootScope','$scope','$http',function($rootScope,$scope,$http) {



  // Imposta una nuova password per l'utente corrispondente a un indirizzo e-mail.
  $scope.setNewPassword = function() {
    const f = $scope.form;
    if (f.email.$error.required || f.email.$error.email) $rootScope.alert('danger','<p>The e-mail address is invalid.</p>');
    else {

    }
  };



}]);