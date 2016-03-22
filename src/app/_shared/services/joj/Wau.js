angular.module('joj.shared')

  .factory('WauService', function (jsonpService, JojEpizodesExtractor, $q, RestJoj, JojService, RestWau) {

    var service = function () {
      JojService.apply(this, arguments);
    };

    service.prototype = new JojService();
    service.prototype.api = RestWau.service('services/Video.php');
    service.prototype.archiveUrl = 'http://wau.joj.sk/wau-archiv.html';

    service.prototype.playLiveStream = function (divId) {
      var flashvars = {
        basePath: "http:\/\/wau.joj.sk\/",
        pageId: 36655,
        channel: 40,
        playerURL: "http:\/\/player.joj.sk\/JojPlayer.5.7.swf",
        ui: "uiPlay|uiFullScreen|uiLargePlay|uiVolume|uiQuality"
      };
      var attributes = {};
      var params = {
        allowFullScreen: "true"
      };
      swfobject.embedSWF("http:\/\/player.joj.sk\/JojLivePanel.5.4.swf", divId, "640", "360", "10", "", flashvars, params, attributes);
    };

    service.prototype.getArchive = function () {
      var defered = $q.defer();

      jsonpService.get(service.prototype.archiveUrl).then(function (r) {
        var archive = JojEpizodesExtractor.extractArchive(r);
        var whatson = JojEpizodesExtractor.extractWhatsOn(r);
        defered.resolve({archive: archive, whatson: whatson});
      });
      return defered.promise;
    };

    return service;
  });
