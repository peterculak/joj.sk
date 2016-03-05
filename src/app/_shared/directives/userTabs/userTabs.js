angular.module('joj.shared')

.directive('jojUserTabs', function($rootScope, $stateParams, User, DemoboxRepository) {
  'use strict';

  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'app/_shared/directives/userTabs/userTabs.html',
    scope: {
      title: '@',
      description: '@',
      dynamicClassName: '@'
    },
    link: function(scope) {
    }
  };
});
