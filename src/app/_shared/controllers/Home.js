angular.module('joj.shared')

  .controller('HomeCtrl', function (JojService, $sce) {
    'use strict';

    var ctrl = this;

    ctrl.url = 'http://varenie.joj.sk/moja-mama-vari-lepsie-ako-tvoja-archiv/2016-03-04-moja-mama-vari-lepsie-ako-tvoja-premiera.html';

    ctrl.streams = [];

    ctrl.epizodes = [];
    ctrl.videoSrc = '';

    ctrl.submit = function () {
      JojService.getEpizodesList(ctrl.url).then(function (epizodes) {
        for (var i in epizodes) {
          ctrl.epizodes.push({url: epizodes[i]});
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
    };

    ctrl.submit();
  });
