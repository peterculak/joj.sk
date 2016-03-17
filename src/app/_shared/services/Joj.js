angular.module('joj.shared')

  .factory('JojService', function (jsonpService, EpizodesExtractorService, $q, Restangular) {

    var service = {};

    service.fetchingEpizodes = false;
    service.fetchingStreams  = false;

    service.nodes = ['http://n16.joj.sk/storage'];

    service.getArchive = function () {
      var defered = $q.defer();

      jsonpService.get('http://www.joj.sk/archiv.html').then(function (r) {
        var archive = EpizodesExtractorService.extractArchive(r);
        defered.resolve(archive);
      });
      return defered.promise;
    };


    service.getEpizodesList = function (url) {
      var defered = $q.defer();
      service.fetchingEpizodes = true;
      jsonpService.get(url).then(function (r) {
        var epizodes = EpizodesExtractorService.extractEpizodes(r);
        defered.resolve(epizodes);
        service.fetchingEpizodes = false;
      });
      return defered.promise;
    };

    service.getEpizodeIdFromUrl = function (url) {
      var defered = $q.defer();
      jsonpService.get(url).then(function (r) {
        var videoId = EpizodesExtractorService.getVideoId(r);
        defered.resolve(videoId);
      });
      return defered.promise;
    };

    var Varenie = Restangular.service('services/Video.php');

    service.getStreamUrls = function (url) {
      var defered = $q.defer();
      service.fetchingStreams = true;
      service.getEpizodeIdFromUrl(url).then(function (videoId) {
        Varenie.one().get({clip: videoId}).then(function(streamInfo){
          var tmp = EpizodesExtractorService.extractStreamUrls(streamInfo);
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

    var params = {
      wmode: "opaque",
      allowFullScreen: "true",
      allowScriptAccess: "always"
    };
    var attributes = {};

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
      var params = {};
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
      var params = {};
      swfobject.embedSWF("http:\/\/player.joj.sk\/JojLivePanel.5.4.swf", divId, "640", "360", "10", "", flashvars, params, attributes);
    };
    
    return service;
  });
