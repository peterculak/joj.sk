angular.module('joj.shared')

  .factory('MarkizaService', function (jsonpService, MarkizaEpizodesExtractor, $q, Restangular) {

    var service = {};

    service.fetchingEpizodes = false;
    service.fetchingStreams  = false;

    service.nodes = [];

    service.getArchive = function () {
      var defered = $q.defer();

      jsonpService.get('http://videoarchiv.markiza.sk/uvod').then(function (r) {
        var archive = MarkizaEpizodesExtractor.extractArchive(r);
        console.log(archive);
        defered.resolve(archive);
      });
      return defered.promise;
    };


    service.getEpizodesList = function (url) {
      var defered = $q.defer();
      service.fetchingEpizodes = true;
      jsonpService.get(url).then(function (r) {
        var epizodes = MarkizaEpizodesExtractor.extractEpizodes(r);
        defered.resolve(epizodes);
        service.fetchingEpizodes = false;
      });
      return defered.promise;
    };

    service.getEpizodeIdFromUrl = function (url) {
      var defered = $q.defer();
      jsonpService.get(url).then(function (r) {
        var videoId = MarkizaEpizodesExtractor.getVideoId(r);
        defered.resolve(videoId);
      });
      return defered.promise;
    };

    var MarkizaApi = Restangular.service('services/Video.php');

    service.getStreamUrls = function (url) {
      var defered = $q.defer();
      service.fetchingStreams = true;
      service.getEpizodeIdFromUrl(url).then(function (videoId) {
        MarkizaApi.one().get({clip: videoId}).then(function(streamInfo){
          var tmp = MarkizaEpizodesExtractor.extractStreamUrls(streamInfo);
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
    
    return service;
  });
