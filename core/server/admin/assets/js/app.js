define(['require'],function(require) {

  var app = angular.module('Leaf',['ui.router','ngSanitize','angular-gravatar']);

  app.config(['$urlMatcherFactoryProvider','$controllerProvider','$compileProvider','$filterProvider','$provide','$stateProvider','$urlRouterProvider','$locationProvider',function($urlMatcherFactoryProvider,$controllerProvider,$compileProvider,$filterProvider,$provide,$stateProvider,$urlRouterProvider,$locationProvider) {

    $urlMatcherFactoryProvider.strictMode(false);

    app.register = {
        controller : $controllerProvider.register,
        directive : $compileProvider.directive,
        filter : $filterProvider.register,
        factory : $provide.factory,
        service : $provide.service
    };

    var modulesUrl = 'app/components/';

    $stateProvider
    
    // Setup.
    .state('setup',{
      url : '/setup',
      templateUrl : modulesUrl + 'setup/setup.html',
      title : 'Setup',
      controller : 'setupController',
      resolve : {
        deps : ['$q',function($q) {
          var q = $q.defer();
          require(['../../' + modulesUrl + 'setup/setup'],function() {
            q.resolve();
          });
          return q.promise;
        }]
      },
      cache : false
    })

    // Login.
    .state('login',{
      url : '/login',
      templateUrl : modulesUrl + 'login/login.html',
      title : 'Login',
      controller : 'loginController',
      resolve : {
        deps : ['$q',function($q) {
          var q = $q.defer();
          require(['../../' + modulesUrl + 'login/login'],function() {
            q.resolve();
          });
          return q.promise;
        }]
      },
      cache : false
    })
    
    // Sign up.
    .state('signup',{
      url : '/signup/:token',
      templateUrl : modulesUrl + 'login/signup.html',
      title : 'Sign up',
      controller : 'signupController',
      resolve : {
        deps : ['$q',function($q) {
          var q = $q.defer();
          require(['../../' + modulesUrl + 'login/signup'],function() {
            q.resolve();
          });
          return q.promise;
        }]
      },
      cache : false
    })

    // Lost password.
    .state('lostpassword',{
      url : '/lost-password',
      templateUrl : modulesUrl + 'login/lost-password.html',
      title : 'Lost password',
      controller : 'lostpasswordController',
      resolve : {
        deps : ['$q',function($q) {
          var q = $q.defer();
          require(['../../' + modulesUrl + 'login/lost-password'],function() {
            q.resolve();
          });
          return q.promise;
        }]
      },
      cache : false
    })

    // Dashboard.
    .state('dashboard',{
      url : '/dashboard',
      templateUrl : modulesUrl + 'dashboard/dashboard.html',
      title : 'Dashboard',
      data : {active : 'dashboard'},
      controller : 'dashboardController',
      resolve : {
        deps : ['$q',function($q) {
          var q = $q.defer();
          require(['../../' + modulesUrl + 'dashboard/dashboard'],function() {
            q.resolve();
          });
          return q.promise;
        }]
      },
      cache : false
    })

    // Editor (new post/page).
    .state('new-post',{
      url : '/editor',
      templateUrl : modulesUrl + 'posts/editor.html',
      title : 'Editor',
      data : {active : 'editor',nosearch : true},
      controller : 'editorController',
      resolve : {
        deps : ['$q',function($q) {
          var q = $q.defer();
          require(['../../' + modulesUrl + 'posts/editor'],function() {
            q.resolve();
          });
          return q.promise;
        }]
      },
      cache : false
    })

    // Editor (edit post/page).
    .state('edit-post',{
      url : '/editor/:id',
      templateUrl : modulesUrl + 'posts/editor.html',
      title : 'Editor',
      data : {active : 'editor',nosearch : true},
      controller : 'editorController',
      resolve : {
        deps : ['$q',function($q) {
          var q = $q.defer();
          require(['../../' + modulesUrl + 'posts/editor'],function() {
            q.resolve();
          });
          return q.promise;
        }]
      },
      cache : false
    })

    // Team.
    .state('users',{
      url : '/users',
      templateUrl : modulesUrl + 'users/users.html',
      title : 'Team',
      data : {active : 'users'},
      controller : 'usersController',
      resolve : {
        deps : ['$q',function($q) {
          var q = $q.defer();
          require(['../../' + modulesUrl + 'users/users'],function() {
            q.resolve();
          });
          return q.promise;
        }]
      },
      cache : false
    })

    // User profile.
    .state('user',{
      url : '/user/:user',
      templateUrl : modulesUrl + 'users/user.html',
      title : 'Team',
      data : {active : 'users'},
      controller : 'userController',
      resolve : {
        deps : ['$q',function($q) {
          var q = $q.defer();
          require(['../../' + modulesUrl + 'users/user'],function() {
            q.resolve();
          });
          return q.promise;
        }]
      },
      cache : false
    })

    // Posts and pages.
    .state('posts',{
      url : '/posts',
      templateUrl : modulesUrl + 'posts/posts.html',
      title : 'Posts',
      data : {active : 'posts'},
      controller : 'postsController',
      resolve : {
        deps : ['$q',function($q) {
          var q = $q.defer();
          require(['../../' + modulesUrl + 'posts/posts'],function() {
            q.resolve();
          });
          return q.promise;
        }]
      },
      cache : false
    })

    // Comments.
    .state('comments',{
      url : '/comments',
      templateUrl : modulesUrl + 'comments/comments.html',
      title : 'Comments',
      data : {active : 'comments'},
      controller : 'commentsController',
      resolve : {
        deps : ['$q',function($q) {
          var q = $q.defer();
          require(['../../' + modulesUrl + 'comments/comments'],function() {
            q.resolve();
          });
          return q.promise;
        }]
      },
      cache : false
    })

    // Media.
    .state('media',{
      url : '/media',
      templateUrl : modulesUrl + 'media/media.html',
      title : 'Media',
      data : {active : 'media'},
      controller : 'mediaController',
      resolve : {
        deps : ['$q',function($q) {
          var q = $q.defer();
          require(['../../' + modulesUrl + 'media/media'],function() {
            q.resolve();
          });
          return q.promise;
        }]
      },
      cache : false
    })

    // Tags.
    .state('tags',{
      url : '/tags',
      templateUrl : modulesUrl + 'tags/tags.html',
      title : 'Tags',
      data : {active : 'tags'},
      controller : 'tagsController',
      resolve : {
        deps : ['$q',function($q) {
          var q = $q.defer();
          require(['../../' + modulesUrl + 'tags/tags'],function() {
            q.resolve();
          });
          return q.promise;
        }]
      },
      cache : false
    })

    // Sharing.
    .state('shares',{
      url : '/shares',
      templateUrl : modulesUrl + 'shares/shares.html',
      title : 'Sharing',
      data : {active : 'shares',nosearch : true},
      controller : 'sharesController',
      resolve : {
        deps : ['$q',function($q) {
          var q = $q.defer();
          require(['../../' + modulesUrl + 'shares/shares'],function() {
            q.resolve();
          });
          return q.promise;
        }]
      },
      cache : false
    })

    // Navigation menu.
    .state('navigation',{
      url : '/navigation',
      templateUrl : modulesUrl + 'navigation/navigation.html',
      title : 'Navigation',
      data : {active : 'navigation',nosearch : true},
      controller : 'navigationController',
      resolve : {
        deps : ['$q',function($q) {
          var q = $q.defer();
          require(['../../' + modulesUrl + 'navigation/navigation'],function() {
            q.resolve();
          });
          return q.promise;
        }]
      },
      cache : false
    })

    // Themes.
    .state('themes',{
      url : '/themes',
      templateUrl : modulesUrl + 'themes/themes.html',
      title : 'Themes',
      data : {active : 'themes'},
      controller : 'themesController',
      resolve : {
        deps : ['$q',function($q) {
          var q = $q.defer();
          require(['../../' + modulesUrl + 'themes/themes'],function() {
            q.resolve();
          });
          return q.promise;
        }]
      },
      cache : false
    })

    // General settings.
    .state('settings-general',{
      url : '/settings/general',
      templateUrl : modulesUrl + 'settings/general.html',
      title : 'General settings',
      data : {active : 'settings-general',nosearch : true},
      controller : 'settingsController',
      resolve : {
        deps : ['$q',function($q) {
          var q = $q.defer();
          require(['../../' + modulesUrl + 'settings/settings'],function() {
            q.resolve();
          });
          return q.promise;
        }]
      },
      cache : false
    })

    // Contents settings.
    .state('settings-contents',{
      url : '/settings/contents',
      templateUrl : modulesUrl + 'settings/contents.html',
      title : 'Contents settings',
      data : {active : 'settings-contents',nosearch : true},
      controller : 'settingsController',
      resolve : {
        deps : ['$q',function($q) {
          var q = $q.defer();
          require(['../../' + modulesUrl + 'settings/settings'],function() {
            q.resolve();
          });
          return q.promise;
        }]
      },
      cache : false
    })

    // Users settings.
    .state('settings-users',{
      url : '/settings/users',
      templateUrl : modulesUrl + 'settings/users.html',
      title : 'Users settings',
      data : {active : 'settings-users',nosearch : true},
      controller : 'settingsController',
      resolve : {
        deps : ['$q',function($q) {
          var q = $q.defer();
          require(['../../' + modulesUrl + 'settings/settings'],function() {
            q.resolve();
          });
          return q.promise;
        }]
      },
      cache : false
    })

    // Labs.
    .state('labs',{
      url : '/labs',
      templateUrl : modulesUrl + 'labs/labs.html',
      title : 'Labs',
      data : {active : 'labs',nosearch : true},
      controller : 'labsController',
      resolve : {
        deps : ['$q',function($q) {
          var q = $q.defer();
          require(['../../' + modulesUrl + 'labs/labs'],function() {
            q.resolve();
          });
          return q.promise;
        }]
      },
      cache : false
    });

    $urlRouterProvider.otherwise('/dashboard');

    $locationProvider.hashPrefix('').html5Mode(true);

  }]);

  app.run(['$rootScope','$location','$state',function($rootScope,$location,$state) {

    // Admin menu.
    $rootScope.adminMenu = [
      {
        id : 'general',
        title : '',
        items : [
          {id : 'dashboard',title : 'Dashboard',url : 'dashboard',icon : 'pulse',roles : []},
          {id : 'editor',title : 'Editor',url : 'editor',icon : 'feather',roles : []},
          {id : 'users',title : 'Team',url : 'users',icon : 'users',roles : []}
        ]
      },
      {
        id : 'contents',
        title : 'Contents',
        items : [
          {id : 'posts',title : 'Posts',url : 'posts',icon : 'copy',roles : []},
          {id : 'comments',title : 'Comments',url : 'comments',icon : 'chatbubble',roles : []},
          {id : 'media',title : 'Media',url : 'media',icon : 'image',roles : []}
        ]
      },
      {
        id : 'personalize',
        title : 'Personalize',
        items : [
          {id : 'tags',title : 'Tags',url : 'tags',icon : 'tags',roles : []},
          {id : 'navigation',title : 'Navigation',url : 'navigation',icon : 'compass',roles : []},
          {id : 'shares',title : 'Sharing',url : 'shares',icon : 'marketing',roles : []},
          {id : 'themes',title : 'Themes',url : 'themes',icon : 'brush',roles : []}
        ]
      },
      {
        id : 'settings',
        title : 'Settings',
        items : [
          {id : 'settings-general',title : 'General',url : 'settings/general',icon : 'gear',roles : []},
          {id : 'settings-contents',title : 'Contents',url : 'settings/contents',icon : 'folder',roles : []},
          {id : 'settings-users',title : 'Users',url : 'settings/users',icon : 'user',roles : []},
          {id : 'labs',title : 'Labs',url : 'labs',icon : 'flask',roles : []}
        ]
      }
    ];

    // Absolute URL for the domain (protocol + host + port).
    $rootScope.siteUrl = $location.protocol() + '://' + $location.host() + ':' + $location.port();

    // Map $state in the $rootScope.
    $rootScope.$state = $state;

    // Check if an item in the admin menu is active.
    $rootScope.isActivePage = function(id) {
      return $state.current.data.active===id;
    };

    // Check if the search input is disabled.
    $rootScope.isSearchDisabled = function() {
      return $state.current.data.nosearch || false;
    };

    // Initialize header.
    $rootScope.initHeader = function() {

      $(window).on('resize',function() {
        $('#header').css('left',($(window).width()>991)? '0' : '-310px');
      });

      $('.nav-bar').css('overflow','hidden');

      $('.nav-bar').on('mouseover',function() {
          $(this).css('overflow','auto');
      }).on('mouseout',function() {
          $(this).css('overflow','hidden');
      });

    };

    // Show header.
    $rootScope.showHeader = function() {
      $rootScope.hideSidebar();
      $('#header').animate({'left' : '0'},300);
    };

    // Hide header.
    $rootScope.hideHeader = function() {
      $('#header').animate({'left' : '-310px'},300);
    };

    // Show sidebar.
    $rootScope.showSidebar = function(event) {
      if (event) event.preventDefault();
      $('#sidebar').animate({'right' : '0'},300);
    };

    // Hide sidebar.
    $rootScope.hideSidebar = function(event) {
      if (event) event.preventDefault();
      $('#sidebar').animate({'right' : '-311px'},300);
    };

    // Show an alert.
    $rootScope.alert = function(level,message) {
      const levels = {
        info : 'info',
        success : 'check',
        warning : 'alert',
        danger : 'alert'
      };
      if (!levels[level]) level = 'info';
      const html = '<div class="alert alert-dismissible alert-' + level + ' fade in" role="alert">' +
      '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
      '<span class="alert-icon glyphicon glyphicon-' + levels[level] + '"></span>' +
      message +
      '</div>';
      $('#alerts').html(html);
    };

  }]);

});
