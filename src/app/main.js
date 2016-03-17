angular.module('joj', [
  'joj.vendors',
  'joj.templates',
  'joj.shared'
])

  .config(function ($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider) {
    'use strict';

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/_shared/views/index.html',
      controller: 'HomeCtrl as ctrl'
    })
    .state('404', {
      url: '*path', // catch all other URLs, this rule must come last!
      templateUrl: 'app/_shared/views/error/404.html'
    });

    $urlRouterProvider.otherwise(function ($injector, $location) {
      var state = $injector.get('$state');
      state.go('404');
      return $location.path();
    });

    $locationProvider.html5Mode(true);

    RestangularProvider.setBaseUrl('http://www.joj.sk');
    RestangularProvider.setDefaultHeaders({
      'Accept': 'application/json'
    });

  })

  .run(function ($rootScope, $timeout, $mdSidenav, $mdIcon) {
    'use strict';

    $rootScope.toggleLeft = buildDelayedToggler('left');
    $rootScope.toggleRight = buildToggler('right');
    $rootScope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };

    $rootScope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          //$log.debug("close LEFT is done");
        });
    };
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $rootScope,
          args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            //$log.debug("toggle " + navID + " is done");
          });
      }, 100);
    }
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            //$log.debug("toggle " + navID + " is done");
          });
      }
    }

  });
