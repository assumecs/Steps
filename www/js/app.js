// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'oc.lazyLoad'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    if(typeof(Steps) !== "undefined"){
      Steps.init();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.step', {
    url: '/step',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/step.html',
        controller: 'stepCtrl'
      }
    },
    resolve:['$ocLazyLoad', function($ocLazyLoad){
      return $ocLazyLoad.load([
        'js/stepCtrl.js',
      ]);
    }]
  })

  .state('app.step.today', {
    url: '/today',
    cache: false,
    // views: {
    //   'menuContent': {
        templateUrl: 'templates/step_today.html',
        controller: 'slideCtrl'
    //   }
    // }
    ,
    resolve:['$ocLazyLoad', function($ocLazyLoad){
      return $ocLazyLoad.load([
        'js/jQuery-2.1.4.min.js',
        'js/directive/stepCircle.js',
        'js/slide.js',
      ]);
    }]
  })

  .state('app.step.total', {
    url: '/total',
    // views: {
    //   'menuContent': {
        templateUrl: 'templates/step_total.html'
    //   }
    // }
    ,
    resolve:['$state', function($state){
      return function(){
        //   $state.go('app.step.today');
      };
    }]
  })

  .state('app.steps', {
    url: '/steps',
    views: {
      'menuContent': {
        templateUrl: 'templates/steps.html',
        controller: 'stepsCtrl'
      }
    },
    resolve:['$ocLazyLoad', function($ocLazyLoad){
      return $ocLazyLoad.load('js/steps.js');
    }]
  })

  .state('app.today', {
    url: '/today',
    views: {
      'menuContent': {
        templateUrl: 'templates/today.html',
        controller: 'stepsCtrl'
      }
    },
    resolve:['$ocLazyLoad', function($ocLazyLoad){
      return $ocLazyLoad.load([
        'js/steps.js',
      ]);
    }]
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/today');
});
