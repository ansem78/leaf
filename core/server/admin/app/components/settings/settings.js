angular.module('Leaf')

.controller('settingsController',['$rootScope','$scope','$filter','$timeout','rolesService','themesService','settingsService',function($rootScope,$scope,$filter,$timeout,rolesService,themesService,settingsService) {

  // Define all avatars.
  $scope.avatars = [
    {id : 'mm',name : 'Mistery man'},
    {id : '',name : 'Gravatar logo'},
    {id : 'identicon',name : 'Identicon',generated : true},
    {id : 'monsterid',name : 'MonsterID',generated : true},
    {id : 'wavatar',name : 'Wavatar',generated : true},
    {id : 'robohash',name : 'Robohash',generated : true},
    {id : 'retro',name : 'Retro',generated : true},
    {id : 'blank',name : 'Blank'}
  ];

  // Define all avatar ratings.
  $scope.ratings = [
    {id : 'g',description : 'Suitable for all audiences.'},
    {id : 'pg',description : 'Possibly offensive. Usually for audiences 13 and above.'},
    {id : 'r',description : 'Intended for adult audiences above 17.'},
    {id : 'x',description : 'Even more mature than above.'}
  ];

  $scope.loadRoles = function() {
    $scope.roles = [];
    rolesService.find().then(function(res) {
      if (res.status===200) $scope.roles = $filter('orderBy')(res.data,'name');
    });
  };

  $scope.loadRoles();

  // Load all themes.
  $scope.loadThemes = function() {
    $scope.themes = [];
    themesService.find().then(function(res) {
      if (res.status===200) $scope.themes = $filter('orderBy')(res.data,'name');
    });
  };

  $scope.loadThemes();

  // Copy all settings into $scope.
  $scope.settings = angular.copy($rootScope.settings);

  // Update settings.
  $scope.updateSettings = function() {
    $rootScope.showLoading('Saving...');
    var settings = [];
    for (var k in $scope.settings) settings.push($scope.settings[k]);
    $timeout(function() {
      settingsService.updateAll(settings).then(function(res) {
        if (res.status===200) {
          $rootScope.loadSettings();
          $rootScope.hideLoading();
        }
        else $rootScope.showMessage(res.data.message);
      });
    },1000);
  };


}]);