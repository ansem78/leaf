angular.module('Leaf')

.controller('userController',['$rootScope','$scope','$stateParams','$filter','rolesService','usersService',function($rootScope,$scope,$stateParams,$filter,rolesService,usersService) {

  $scope.views = [
    {id : 'profile',name : 'Profile',icon : 'user'},
    {id : 'account',name : 'Account',icon : 'gear'},
    {id : 'stats',name : 'Stats',icon : 'pie-chart-c'}
  ];

  // Check if a view is the active one.
  $scope.isActiveView = function(id) {
    return $scope.activeView===id;
  };

  // Set the active view.
  $scope.setActiveView = function(id) {
    $scope.activeView = id;
  };

  $scope.setActiveView($scope.views[0].id);

  // Load all roles.
  $scope.loadRoles = function() {
    $scope.roles = [];
    rolesService.find().then(function(res) {
      if (res.status===200) $scope.roles = $filter('orderBy')(res.data,'name');
    });
  };

  $scope.loadRoles();

  // Load user.
  $scope.loadUser = function() {
    $scope.user = null;
    usersService.get($stateParams.id).then(function(res) {
      if (res.status===200) $scope.user = res.data;
    });
  };

  $scope.loadUser();


}]);