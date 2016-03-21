angular.module('joj.shared')

  .factory('JojService', function (jsonpService, JojEpizodesExtractor, $q, RestJoj) {

    var service = {};

    service.fetchingEpizodes = false;
    service.fetchingStreams  = false;

    service.getWhatsOn = function () {
      var defered = $q.defer();
      jsonpService.get('http://www.joj.sk/archiv.html').then(function (r) {
        defered.resolve(MarkizaEpizodesExtractor.extractWhatsOn(r));
      });
      return defered.promise;
    };

    service.getArchive = function () {
      var defered = $q.defer();

      jsonpService.get('http://www.joj.sk/archiv.html').then(function (r) {
        var archive = JojEpizodesExtractor.extractArchive(r);
        var whatson = JojEpizodesExtractor.extractWhatsOn(r);
        defered.resolve({archive: archive, whatson: whatson});
      });
      return defered.promise;
    };


    service.getEpizodesList = function (url) {
      var defered = $q.defer();
      service.fetchingEpizodes = true;
      jsonpService.get(url).then(function (r) {
        var epizodes = JojEpizodesExtractor.extractEpizodes(r);
        defered.resolve(epizodes);
        service.fetchingEpizodes = false;
      });
      return defered.promise;
    };

    service.getEpizodeIdFromUrl = function (url) {
      var defered = $q.defer();
      jsonpService.get(url).then(function (r) {
        var videoId = JojEpizodesExtractor.getVideoId(r);
        defered.resolve(videoId);
      });
      return defered.promise;
    };

    var JojApi = RestJoj.service('services/Video.php');

    service.getStreamUrls = function (url) {
      var defered = $q.defer();
      service.fetchingStreams = true;
      service.getEpizodeIdFromUrl(url).then(function (videoId) {
        JojApi.one().get({clip: videoId}).then(function(streamInfo){
          defered.resolve(JojEpizodesExtractor.extractStreamUrls(streamInfo));
          service.fetchingStreams = false;
        });
      });
      return defered.promise;
    };

    service.findHighQualityStream = function (streams) {
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

    service.playLiveStream = function (divId) {
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

    service.playJojPlusLiveStream = function (divId) {
      var flashvars = {
        basePath: "http:\/\/plus.joj.sk\/",
        pageId: 54,
        channel: 26,
        playerURL: "http:\/\/player.joj.sk\/JojPlayer.5.7.swf",
        ui: "uiPlay|uiFullScreen|uiLargePlay|uiVolume|uiQuality"
      };
      var attributes = {};
      var params = {
        allowFullScreen: "true"
      };
      swfobject.embedSWF("http:\/\/player.joj.sk\/JojLivePanel.5.4.swf", divId, "640", "360", "10", "", flashvars, params, attributes);
    };

    service.playWauLiveStream = function (divId) {
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
    
    return service;
  });
