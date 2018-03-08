angular.module('Leaf')

.controller('usersController',['$rootScope','$scope','$filter','rolesService','invitesService','usersService',function($rootScope,$scope,$filter,rolesService,invitesService,usersService) {

  /* ---- Roles. ---- */

  // Load all roles.
  $scope.loadRoles = function() {
    $scope.roles = [];
    rolesService.find().then(function(res) {
      if (res.status===200) $scope.roles = $filter('orderBy')(res.data,'name');
    });
  };

  $scope.loadRoles();

  /* ---- Invitations. ---- */

  // Filter an invitation by e-mail address.
  $scope.filterInvite = function(item) {
    if (!$rootScope.search) return true;
    var s = $rootScope.search.toLowerCase();
    return item.email.toLowerCase().indexOf(s)>-1;
  };

  // Setup a new invitation.
  $scope.initInvite = function() {
      $scope.newInvite = {
        email : '',
        role_id : $rootScope.settings.default_role.value
      };
  };

  // Load all invitations.
  $scope.loadInvites = function() {
    $scope.invites = [];
    invitesService.find().then(function(res) {
      if (res.status===200) $scope.invites = $filter('orderBy')(res.data,'email');
    });
  };

  $scope.loadInvites();

  // Set active invitation.
  $scope.setActiveInvite = function(invite) {
    $scope.activeInvite = invite || null;
  };

  // Send invitation.
  $scope.addInvitation = function() {
    invitesService.create($scope.newInvite).then(function(res) {
      if (res.status===200) {

        invitesService.get(res.data.id).then(function(res) {

          if (res.status===200) {
            $scope.invites.push(res.data);
            $scope.invites = $filter('orderBy')($scope.invites,'email');
            $('#send-invite-modal').modal('hide');
          }

        });

      }

    });
  };

  // Update invitation.
  $scope.updateInvitation = function() {
    invitesService.update($scope.activeInvite).then(function(res) {
      if (res.status===200) {

        invitesService.get(res.data.id).then(function(res) {

          if (res.status===200) {

            for (var i=0; i<$scope.invites.length; i++) {
              if ($scope.invites[i].id===res.data.id) {
                $scope.invites[i] = res.data;
                $('#resend-invite-modal').modal('hide');
                return;
              }
            }

          }

        });

      }

    });
  };

  // Delete invitation.
  $scope.removeInvitation = function() {
    invitesService.remove($scope.activeInvite.id).then(function(res) {
      if (res.status===200) {
        for (var i=0; i<$scope.invites.length; i++) {
          if ($scope.invites[i].id===$scope.activeInvite.id) {
            $scope.invites.splice(i,1);
            $scope.setActiveInvite();
            $('#revoke-invite-modal').modal('hide');
          }
        }
      }
    });
  };

  /* ---- Users. ---- */

  // Filter a user by name or e-mail address.
  $scope.filterUser = function(item) {
    if (!$rootScope.search) return true;
    var s = $rootScope.search.toLowerCase();
    return (item.name.toLowerCase().indexOf(s)>-1 || item.email.toLowerCase().indexOf(s)>-1);
  };

  // Load all users.
  $scope.loadUsers = function() {
    $scope.users = [];
    console.log('******************************************************************************************loadusers')
    usersService.find().then(function(res) {
        console.log('ok users', res)
      if (res.status===200) $scope.users = $filter('orderBy')(res.data,'name');
  }).catch(err=>{console.log('errore',err)});
  };

  $scope.loadUsers();



}]);
