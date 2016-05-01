angular.module('joj.shared')

  .factory('JojService', function (jsonpService, JojEpizodesExtractor, $q, RestJoj) {

    var service = function (){

    };

    service.prototype.api = RestJoj.service('services/Video.php');
    service.prototype.archiveUrl = 'http://www.joj.sk/archiv.html';
    service.prototype.fetchingEpizodes = false;
    service.prototype.fetchingStreams  = false;

    service.prototype.getWhatsOn = function () {
      var defered = $q.defer();
      jsonpService.get(service.archiveUrl).then(function (r) {
        defered.resolve(JojEpizodesExtractor.extractWhatsOn(r));
      });
      return defered.promise;
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

    service.prototype.getEpizodesList = function (url) {
      var defered = $q.defer();
      service.fetchingEpizodes = true;
      jsonpService.get(url).then(function (r) {
        var epizodes = JojEpizodesExtractor.extractEpizodes(r);
        defered.resolve(epizodes);
        service.fetchingEpizodes = false;
      });
      return defered.promise;
    };

    service.prototype.getEpizodeIdFromUrl = function (url) {
      var defered = $q.defer();
      jsonpService.get(url).then(function (r) {
        var videoId = JojEpizodesExtractor.getVideoId(r);
        defered.resolve(videoId);
      });
      return defered.promise;
    };

    service.prototype.getStreamUrls = function (url) {
      var defered = $q.defer();
      service.fetchingStreams = true;
      service.prototype.getEpizodeIdFromUrl(url).then(function (videoId) {
        service.prototype.api.one().get({clip: videoId}).then(function(streamInfo){
          defered.resolve(JojEpizodesExtractor.extractStreamUrls(streamInfo));
          service.fetchingStreams = false;
        });
      });
      return defered.promise;
    };

    service.prototype.getStreamUrlsFromId = function (videoId) {
      var defered = $q.defer();
      service.prototype.api.one().get({clip: videoId}).then(function(streamInfo){
        defered.resolve(JojEpizodesExtractor.extractStreamUrls(streamInfo));
        service.fetchingStreams = false;
      });
      return defered.promise;
    };

    service.prototype.findHighQualityStream = function (streams) {
      var q = [];
      for (var i in streams) {
        q[streams[i]['quality']] = streams[i];
      }
      if (q['720p']) {
        return q['720p']['url'];
      }

      if (q['pal']) {
        return q['pal']['url'];
      }

      if (q['540p']) {
        return q['540p']['url'];
      }

      return streams[streams.length - 1]['url'];
    };

    service.prototype.playLiveStream = function (divId) {
      var flashvars = {
        basePath: "http:\/\/live.joj.sk\/",
        pageId: 4,
        channel: 1,
        playerURL: "http:\/\/player.joj.sk\/JojPlayer.5.7.swf",
        ui: "uiPlay|uiFullScreen|uiLargePlay|uiVolume|uiQuality"
      };
      var params = {
        wmode: "opaque",
        allowFullScreen: "true",
        allowScriptAccess: "always"
      };
      var attributes = {};
      swfobject.embedSWF("http:\/\/player.joj.sk\/JojLivePanel.5.4.swf", divId, "640", "360", "10", "", flashvars, params, attributes);
    };
    
    return service;
  });
