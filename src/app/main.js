angular.module('joj', [
  'joj.vendors',
  'joj.templates',
  'joj.shared'
])

  .config(function ($httpProvider, $stateProvider, $urlRouterProvider, RestangularProvider) {
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

    RestangularProvider.setBaseUrl('http://varenie.joj.sk');
    RestangularProvider.setDefaultHeaders({
      'Accept': 'application/json'
    });

  })

  .run(function ($rootScope) {
    'use strict';

  });
