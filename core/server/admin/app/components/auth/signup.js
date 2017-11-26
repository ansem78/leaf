angular.module('Leaf')

.controller('signupController',['$rootScope','$scope','$stateParams','inviteService',function($rootScope,$scope,$stateParams,inviteService) {

  $scope.token = $stateParams.token || '';

  // Get invited user.
  $scope.loadInvitedUser = function() {
    $scope.user = null;
    inviteService.getByToken($scope.token).then(function(res) {
      if (res.status===200) $scope.user = res.data;
    });
  };

  $scope.loadInvitedUser();

  // Check if the invitation is expired.
  $scope.isExpired = function() {
    return ($scope.user && moment($scope.user.expires).valueOf()>moment().valueOf());
  };


}]);