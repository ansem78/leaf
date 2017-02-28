define(['angular'],function(angular) {

  var app = angular.module('Leaf');

  app.register.controller('usersController',['$rootScope','$scope',function($rootScope,$scope) {

    $scope.invited = [
      {
        email : 'elpanda79@yahoo.it',
        id : 1,
        sent : '2017-02-20T22:19:06'
      },
      {
        email : 'nebulosadiorione84@gmail.com',
        id : 2,
        sent : '2017-02-21T15:16:33'
      },
      {
        email : 'imstk@gmail.com',
        id : 3,
        sent : '2017-02-21T10:33:27'
      },
    ];

    $scope.users = [
      {
        description : '',
        email : 'ale@ffhorizon.it',
        fullname : 'Alexandro Morato',
        id : 1,
        location : 'Padova',
        registered : '2017-01-30T20:13:42',
        role : {
          id : 1,
          name : 'Owner',
          slug : 'owner'
        },
        url : ''
      },
      {
        description : '',
        email : 'ilaria.carli@libero.it',
        fullname : 'Ilaria Carli',
        id : 2,
        location : 'Treviso',
        registered : '2017-02-01T11:43:09',
        role : {
          id : 2,
          name : 'Admin',
          slug : 'admin'
        },
        url : ''
      },
      {
        description : '',
        email : 'benepini@email.it',
        fullname : 'Benedetta Pini',
        id : 3,
        location : 'Lucca',
        registered : '2017-02-03T16:55:52',
        role : {
          id : 2,
          name : 'Admin',
          slug : 'admin'
        },
        url : ''
      },
      {
        description : '',
        email : 'info@centrootticaroma.it',
        fullname : 'Antonio Frattolillo',
        id : 4,
        location : 'Padova',
        registered : '2017-02-07T19:32:44',
        role : {
          id : 2,
          name : 'Author',
          slug : 'author'
        },
        url : ''
      },
      {
        description : '',
        email : 'info@datarchivi.con',
        fullname : 'Vicky Mastronardi',
        id : 5,
        location : 'Padova',
        registered : '2017-02-03T09:22:17',
        role : {
          id : 3,
          name : 'Editor',
          slug : 'editor'
        },
        url : ''
      }
    ];




  }]);

});