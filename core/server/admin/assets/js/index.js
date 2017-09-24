require.config({
  baseUrl : 'assets/libs',
  urlArgs : 'v=' + Date.now(),
  deps : ['app'],
  paths : {
    jquery : 'jquery/jquery.min',
    jquery_ui : 'jquery/jquery-ui/jquery-ui.min',
    bootstrap : 'bootstrap/js/bootstrap.min',
    syncscroll : 'jquery/syncscroll',
    angular : 'angular/angular',
    angular_ui_router : 'angular/angular-ui-router.min',
    angular_sanitize : 'angular/angular-sanitize.min',
    angular_sortable : 'angular/ui-sortable/src/sortable',
    angular_gravatar : 'angular/angular-gravatar',
    app : '../js/app'
  },
  shim : {
    jquery : {
      exports : '$'
    },
    jquery_ui : {
      deps : ['jquery']
    },
    bootstrap : {
      deps : ['jquery']
    },
    syncscroll : {
      deps : ['jquery']
    },
    angular : {
      exports : 'angular'
    },
    angular_ui_router : {
      deps : ['angular']
    },
    angular_sanitize : {
      deps : ['angular']
    },
    angular_sortable : {
      deps : ['jquery','jquery_ui','angular']
    },
    angular_gravatar : {
      deps : ['angular']
    },
    app : {
      deps : ['jquery','jquery_ui','bootstrap','syncscroll','angular_ui_router','angular_sanitize','angular_sortable','angular_gravatar']
    }
  }
});

require(['app'],function() {
  angular.bootstrap(document,['Leaf']);
});