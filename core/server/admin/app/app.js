angular.module('Leaf',['ui.router','ngSanitize','ngAnimate','oc.lazyLoad','ui.sortable'])

.config(['$urlMatcherFactoryProvider','$stateProvider','$urlRouterProvider','$locationProvider','$ocLazyLoadProvider',function($urlMatcherFactoryProvider,$stateProvider,$urlRouterProvider,$locationProvider,$ocLazyLoadProvider) {
  $urlMatcherFactoryProvider.strictMode(false);

  var modulesUrl = 'app/components/';
  $stateProvider

  // Setup.
  .state('setup',{
    url : '/setup',
    templateUrl : modulesUrl + 'setup/setup.html',
    title : 'Setup',
    controller : 'setupController',
    resolve : {
      deps : ['$ocLazyLoad',function($ocLazyLoad) {
        var deps = [
          modulesUrl + 'setup/setup-service.js',
          modulesUrl + 'setup/setup.js'
        ];
        return $ocLazyLoad.load(deps);
      }]
    },
    cache : false
  })

  // Login.
  .state('login',{
    url : '/login',
    templateUrl : modulesUrl + 'auth/login.html',
    title : 'Login',
    controller : 'loginController',
    resolve : {
      deps : ['$ocLazyLoad',function($ocLazyLoad) {
        var deps = [
          modulesUrl + 'auth/login.js'
        ];
        return $ocLazyLoad.load(deps);
      }]
    },
    cache : false
  })

  // Sign up.
  .state('signup',{
    url : '/signup/:token',
    templateUrl : modulesUrl + 'auth/signup.html',
    title : 'Sign up',
    controller : 'signupController',
    resolve : {
      deps : ['$ocLazyLoad',function($ocLazyLoad) {
        var deps = [
          modulesUrl + 'users/invites-service.js',
          modulesUrl + 'auth/signup.js'
        ];
        return $ocLazyLoad.load(deps);
      }]
    },
    cache : false
  })

  // Lost password.
  .state('lostpassword',{
    url : '/lost-password',
    templateUrl : modulesUrl + 'auth/lost-password.html',
    title : 'Lost password',
    controller : 'lostpasswordController',
    resolve : {
      deps : ['$ocLazyLoad',function($ocLazyLoad) {
        var deps = [
          modulesUrl + 'auth/lost-password.js'
        ];
        return $ocLazyLoad.load(deps);
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
      deps : ['$ocLazyLoad',function($ocLazyLoad) {
        var deps = [
          modulesUrl + 'dashboard/dashboard.js'
        ];
        return $ocLazyLoad.load(deps);
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
      deps : ['$ocLazyLoad',function($ocLazyLoad) {
        var deps = [
          'assets/libs/jquery/syncscroll.js',
          modulesUrl + 'posts/editor.js'
        ];
        return $ocLazyLoad.load(deps);
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
      deps : ['$ocLazyLoad',function($ocLazyLoad) {
        var deps = [
          'assets/libs/jquery/syncscroll.js',
          modulesUrl + 'posts/editor.js'
        ];
        return $ocLazyLoad.load(deps);
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
      deps : ['$ocLazyLoad',function($ocLazyLoad) {
        var deps = [
          modulesUrl + 'users/roles-service.js',
          modulesUrl + 'users/invites-service.js',
          modulesUrl + 'users/users-service.js',
          modulesUrl + 'users/users.js'
        ];
        return $ocLazyLoad.load(deps);
      }]
    },
    cache : false
  })

  // User profile.
  .state('user',{
    url : '/users/:id',
    templateUrl : modulesUrl + 'users/user.html',
    title : 'Profile',
    data : {active : 'users',nosearch : true},
    controller : 'userController',
    resolve : {
      deps : ['$ocLazyLoad',function($ocLazyLoad) {
        var deps = [
          modulesUrl + 'users/roles-service.js',
          modulesUrl + 'users/users-service.js',
          modulesUrl + 'users/user.js'
        ];
        return $ocLazyLoad.load(deps);
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
      deps : ['$ocLazyLoad',function($ocLazyLoad) {
        var deps = [
          modulesUrl + 'posts/posts.js'
        ];
        return $ocLazyLoad.load(deps);
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
      deps : ['$ocLazyLoad',function($ocLazyLoad) {
        var deps = [
          modulesUrl + 'comments/comments.js'
        ];
        return $ocLazyLoad.load(deps);
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
      deps : ['$ocLazyLoad',function($ocLazyLoad) {
        var deps = [
          modulesUrl + 'media/media.js'
        ];
        return $ocLazyLoad.load(deps);
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
      deps : ['$ocLazyLoad',function($ocLazyLoad) {
        var deps = [
          modulesUrl + 'tags/tags-service.js',
          modulesUrl + 'tags/tags.js'
        ];
        return $ocLazyLoad.load(deps);
      }]
    },
    cache : false
  })

  // Navigation.
  .state('navigation',{
    url : '/navigation',
    templateUrl : modulesUrl + 'navigation/navigation.html',
    title : 'Navigation',
    data : {active : 'navigation',nosearch : true},
    controller : 'navigationController',
    resolve : {
      deps : ['$ocLazyLoad',function($ocLazyLoad) {
        var deps = [
          modulesUrl + 'navigation/navigation-service.js',
          modulesUrl + 'navigation/navigation.js'
        ];
        return $ocLazyLoad.load(deps);
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
      deps : ['$ocLazyLoad',function($ocLazyLoad) {
        var deps = [
          modulesUrl + 'shares/shares-service.js',
          modulesUrl + 'shares/shares.js'
        ];
        return $ocLazyLoad.load(deps);
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
      deps : ['$ocLazyLoad',function($ocLazyLoad) {
        var deps = [
          modulesUrl + 'themes/themes.js'
        ];
        return $ocLazyLoad.load(deps);
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
      deps : ['$ocLazyLoad',function($ocLazyLoad) {
        var deps = [
          modulesUrl + 'users/roles-service.js',
          modulesUrl + 'themes/themes-service.js',
          modulesUrl + 'settings/settings-service.js',
          modulesUrl + 'settings/settings.js'
        ];
        return $ocLazyLoad.load(deps);
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
      deps : ['$ocLazyLoad',function($ocLazyLoad) {
        var deps = [
          modulesUrl + 'users/roles-service.js',
          modulesUrl + 'themes/themes-service.js',
          modulesUrl + 'settings/settings-service.js',
          modulesUrl + 'settings/settings.js'
        ];
        return $ocLazyLoad.load(deps);
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
      deps : ['$ocLazyLoad',function($ocLazyLoad) {
        var deps = [
          modulesUrl + 'users/roles-service.js',
          modulesUrl + 'themes/themes-service.js',
          modulesUrl + 'settings/settings-service.js',
          modulesUrl + 'settings/settings.js'
        ];
        return $ocLazyLoad.load(deps);
      }]
    },
    cache : false
  })

  // Advanced settings.
  .state('settings-advanced',{
    url : '/settings/advanced',
    templateUrl : modulesUrl + 'settings/advanced.html',
    title : 'Advanced settings',
    data : {active : 'settings-advanced',nosearch : true},
    controller : 'settingsController',
    resolve : {
      deps : ['$ocLazyLoad',function($ocLazyLoad) {
        var deps = [
          modulesUrl + 'users/roles-service.js',
          modulesUrl + 'themes/themes-service.js',
          modulesUrl + 'settings/settings-service.js',
          modulesUrl + 'settings/settings.js'
        ];
        return $ocLazyLoad.load(deps);
      }]
    },
    cache : false
  });

  $urlRouterProvider.otherwise('/dashboard');

  $locationProvider.hashPrefix('').html5Mode(true);

}])

.run(['$rootScope','$location','$state','$http','$ocLazyLoad',function($rootScope,$location,$state,$http,$ocLazyLoad) {
  var deps = [
    'app/shared/filters.js',
    'app/shared/directives.js'
  ];

  $ocLazyLoad.load(deps);

  // Admin menu.
  $rootScope.adminMenu = [
    {
      id : 'general',
      title : '',
      items : [
        {id : 'dashboard',title : 'Dashboard',url : 'dashboard',icon : 'pulse',roles : []},
        {id : 'editor',title : 'Editor',url : 'editor',icon : 'pen-b',roles : []},
        {id : 'users',title : 'Team',url : 'users',icon : 'users',roles : []}
      ]
    },
    {
      id : 'contents',
      title : 'Contents',
      items : [
        {id : 'posts',title : 'Posts',url : 'posts',icon : 'copy',roles : []},
        {id : 'comments',title : 'Comments',url : 'comments',icon : 'bubble-a',roles : []},
        {id : 'media',title : 'Media',url : 'media',icon : 'image',roles : []}
      ]
    },
    {
      id : 'personalize',
      title : 'Personalize',
      items : [
        {id : 'tags',title : 'Tags',url : 'tags',icon : 'tags-a',roles : []},
        {id : 'navigation',title : 'Navigation',url : 'navigation',icon : 'compass',roles : []},
        {id : 'shares',title : 'Sharing',url : 'shares',icon : 'share-b',roles : []},
        {id : 'themes',title : 'Themes',url : 'themes',icon : 'brush',roles : []}
      ]
    },
    {
      id : 'settings',
      title : 'Settings',
      items : [
        {id : 'settings-general',title : 'General',url : 'settings/general',icon : 'gear',roles : []},
        {id : 'settings-contents',title : 'Contents',url : 'settings/contents',icon : 'folder-open-a',roles : []},
        {id : 'settings-users',title : 'Users',url : 'settings/users',icon : 'user',roles : []},
        {id : 'settings-advanced',title : 'Advanced',url : 'settings/advanced',icon : 'wrench-c',roles : []}
      ]
    }
  ];

  // Absolute URL for the domain (protocol + host + port).
  $rootScope.siteUrl = $location.protocol() + '://' + $location.host() + ':' + $location.port();

  // Map $state in the $rootScope.
  $rootScope.$state = $state;

  // Initialize loading modal.
  $rootScope.initLoading = function() {
    $rootScope.loading = 'Loading...';
    $('#loading-modal').modal({show : false,backdrop : 'static'});
  };

  // Show loading modal.
  $rootScope.showLoading = function(message) {
    if (message) $rootScope.loading = message;
    $('#loading-modal').modal('show');
  };

  // Hide loading modal.
  $rootScope.hideLoading = function() {
    $('#loading-modal').modal('hide');
  };

  // Initialize message modal.
  $rootScope.initMessage = function() {
    $rootScope.message = {
      text : '',
      severity : 'danger'
    };
    $('#message-modal').modal({show : false});
  };

  // Set message.
  $rootScope.setMessage = function(message,severity) {
    $rootScope.hideLoading();
    severity = severity || '';
    severity = severity.toLowerCase();

    var icons = {
      info : 'info-a',
      success : 'check',
      warning : 'alert-circle',
      danger : 'alert-triangle'
    };

    if (!icons.hasOwnProperty(severity)) severity = 'danger';

    $rootScope.message = {
      text : message,
      icon : icons[severity],
      severity : severity
    };
  };

  // Show message modal.
  $rootScope.showMessage = function(message,severity) {
    $rootScope.hideLoading();
    severity = severity || '';
    severity = severity.toLowerCase();

    var icons = {
      info : 'info-a',
      success : 'check',
      warning : 'alert-circle',
      danger : 'alert-triangle'
    };

    if (!icons.hasOwnProperty(severity)) severity = 'danger';

    $rootScope.message = {
      text : message,
      icon : icons[severity],
      severity : severity
    };

    $('#message-modal').modal('show');
  };

  // Initialize search.
  $rootScope.initSearch = function(event) {
    if (event) event.preventDefault();
    $rootScope.search = '';
  };

  // Load all settings.
  $rootScope.loadSettings = function() {
    $rootScope.settings = {};
    $http.get($rootScope.siteUrl + '/api/settings').then(function(res) {
      if (res.status===200) for (var i=0; i<res.data.length; i++) $rootScope.settings[res.data[i].name] = res.data[i];
    });
  };

  // When a route changes, initialize search string.
  $rootScope.$on('$stateChangeSuccess',function(event) {
    //if ($rootScope.isMobile()) $rootScope.hideHeader();
    $rootScope.initSearch();
    $rootScope.loadSettings();
  });

  // Initialize system info.
  $rootScope.loadSystemInfo = function() {
    $rootScope.systemInfo = {
      env : {},
      platform : {},
      server : {},
      client : {
        useragent : navigator.userAgent || 'Unknown',
        engine : navigator.product || 'Unknown',
        online : navigator.onLine || false,
        geolocation : navigator.geolocation || false,
        cookies : navigator.cookieEnabled || false
      }
    };
    $http.get($rootScope.siteUrl + '/api/misc/system').then(function(res) {
      if (res.status===200) {
        $rootScope.systemInfo.env = res.data.env;
        $rootScope.systemInfo.platform = res.data.platform;
        $rootScope.systemInfo.server = res.data.server;
      }
    },
    function(err) {
      console.error(err);
    });
  };

  $rootScope.loadSystemInfo();

  // Check if an item in the admin menu is active.
  $rootScope.isActivePage = function(id) {
    return $state.current.data.active===id;
  };

  // Check if the search input is disabled.
  $rootScope.isSearchDisabled = function() {
    return $state.current.data.nosearch || false;
  };

  // Check if the viewport size is a mobile device one.
  $rootScope.isMobile = function() {
      return $(window).width()<992;
  };

  // Initialize header.
  $rootScope.initHeader = function() {

    $(window).on('resize',function() {
      $('#header').eq(0).css('left',($rootScope.isMobile())? '-304px' : '0');
    });

    $('#header nav').css('overflow','hidden');

    $('#header nav').on('mouseover',function() {
        $(this).css('overflow','auto');
    }).on('mouseout',function() {
        $(this).css('overflow','hidden');
    });

  };

  // Show header.
  $rootScope.showHeader = function() {
    $rootScope.hideSidebar();
    $('#header nav').scrollTop(0);
    $('#header').eq(0).animate({left : '0'},300);
  };

  // Hide header.
  $rootScope.hideHeader = function() {
    $('#header').eq(0).animate({left : '-304px'},300);
  };

  // Show sidebar.
  $rootScope.showSidebar = function(event) {
    if (event) event.preventDefault();
    $('#sidebar .content').scrollTop(0);
    $('#sidebar').eq(0).animate({right : '0'},300);
  };

  // Hide sidebar.
  $rootScope.hideSidebar = function(event) {
    if (event) event.preventDefault();
    $('#sidebar').eq(0).animate({right : '-309px'},300);
  };





  // Initialize help modal.
  $rootScope.initHelp = function(html) {
    $rootScope.help = html || '<p>No help is available for this page.</p>';
  };

  $rootScope.initHelp();


}]);
