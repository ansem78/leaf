angular.module('Leaf')

.controller('settingsController',['$rootScope','$scope','$filter','$timeout','$q','rolesService','themesService','settingsService',function($rootScope,$scope,$filter,$timeout,$q,rolesService,themesService,settingsService) {

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

    // Load all settings.
    $scope.loadSettings = function() {
        $scope.settings = {};
        settingsService.find().then(function(res) {
          if (res.status===200) for (var i=0; i<res.data.length; i++) $scope.settings[res.data[i].name] = res.data[i];
        });
    };

    $scope.loadSettings();

  // Update one or more settings.
  $scope.updateSettings = function(settings) {
    $rootScope.showLoading('Saving...');

    var promises = [];

    $timeout(function() {

        for (var i=0; i<settings.length; i++) promises.push(settingsService.update($scope.settings[settings[i]]));

        $q.all(promises).then(function(res) {
            for (var i=0; i<res.length; i++) {
                if (res[i].status!==200) {
                  $rootScope.showMessage(res[i].data.message);
                  return;
                }
                else $scope.settings[res[i].data.name] = res[i].data;
            }
            $rootScope.loadSettings();
            $rootScope.hideLoading();
        });
    },1000);
  };


}]);