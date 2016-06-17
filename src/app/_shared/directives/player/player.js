angular.module('joj.shared')

  .directive('video', function(Player, JojService) {
    'use strict';

    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/player/player.html',
      scope: {
        video: '='
      },
      link: function(scope, el) {
        scope.isChrome = function isChrome() {
          return Player.isChrome();
        };
        scope.Player = Player;
        scope.JojService = JojService;

        if (scope.video && scope.video.id) {
          if (scope.video.service === 'markiza') {
            Player.playMarkizaVideoId(scope.video.id, scope.video.autoplay);
          } else if (scope.video.service === 'joj') {
            Player.playJojArchiveVideoId(scope.video.id, scope.video.autoplay);
          }
        }
      }
    };
  });
