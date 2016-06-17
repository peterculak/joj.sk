angular.module('joj.shared')

  .directive('epizodes', function(Player, JojService, MarkizaService, $timeout) {
    'use strict';

    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/epizodes/list.html',
      controller: 'HomeCtrl',
      scope: {
        epizodes: '='
      },
      link: function(scope, el) {
        scope.Player = Player;
        scope.JojService = JojService;
        scope.MarkizaService = MarkizaService;

        scope.items = [];

        if (scope.epizodes.limit === undefined) {
          $timeout(function(){
            scope.epizodes.limit = 10;
          });
        }

        if (scope.epizodes.url) {
          if (scope.epizodes.url.indexOf('markiza.sk') > -1) {
            MarkizaService.getEpizodesList(scope.epizodes.url).then(function(r){
              scope.items = r;
            });
          } else if (scope.epizodes.url.indexOf('joj.sk')) {
            var joj = new JojService();
            joj.getEpizodesList(scope.epizodes.url).then(function(r){
              scope.items = r;
            });
          }
        }
      }
    };
  });
