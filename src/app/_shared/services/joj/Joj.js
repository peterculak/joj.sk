angular.module('joj.shared')

  .factory('JojService', function (jsonpService, JojEpizodesExtractor, $q, RestJoj) {

    var service = {};

    service.fetchingEpizodes = false;
    service.fetchingStreams  = false;

    service.nodes = ['http://n16.joj.sk/storage'];

    service.getArchive = function () {
      var defered = $q.defer();

      jsonpService.get('http://www.joj.sk/archiv.html').then(function (r) {
        var archive = JojEpizodesExtractor.extractArchive(r);
        defered.resolve(archive);
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
          var tmp = JojEpizodesExtractor.extractStreamUrls(streamInfo);
          var urls = [];
          for (var i in tmp) {
            urls.push(service.nodes[0] + '/' + tmp[i].replace('dat/', ''));
          }
          defered.resolve(urls);
          service.fetchingStreams = false;
        });
      });
      return defered.promise;
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
