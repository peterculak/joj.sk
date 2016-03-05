angular.module('joj.shared')

  .controller('HomeCtrl', function (JojService, $sce) {
    'use strict';

    var ctrl = this;

    ctrl.url = '';

    ctrl.streams = [];

    ctrl.epizodes = [];
    ctrl.videoSrc = '';

    ctrl.submit = function () {
      JojService.get(ctrl.url).then(function (r) {
        for (var i in r) {
          ctrl.epizodes.push({url: r[i]});
        }
      });
    };

    ctrl.play = function (event, url) {
      event.preventDefault();
      JojService.getStreamUrls(url).then(function (streams) {
        ctrl.streams = streams;
        ctrl.videoSrc = $sce.trustAsResourceUrl(streams[streams.length - 1]);
      });
      return false;
    }
  });
