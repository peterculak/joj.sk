angular.module('joj.shared')

  .factory('MarkizaService', function (jsonpService, MarkizaEpizodesExtractor, $q, RestMarkiza) {

    var service = {};

    service.fetchingEpizodes = false;
    service.fetchingStreams  = false;

    service.getWhatsOn = function () {
      var defered = $q.defer();
      jsonpService.get('http://videoarchiv.markiza.sk/uvod').then(function (r) {
        defered.resolve(MarkizaEpizodesExtractor.extractWhatsOn(r));
      });
      return defered.promise;
    };

    service.getArchive = function () {
      var defered = $q.defer();

      jsonpService.get('http://videoarchiv.markiza.sk/uvod').then(function (r) {
        var archive = MarkizaEpizodesExtractor.extractArchive(r);
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
      var last = url.split('/').pop();
      return last.split('_').shift();
    };

    var MarkizaApi = RestMarkiza.service('json/video.json');

    service.getStreamUrls = function (url) {
      var defered = $q.defer();
      service.fetchingStreams = true;
      var videoId = service.getEpizodeIdFromUrl(url);
      MarkizaApi.one().get({id: videoId}).then(function(streamInfo){
        defered.resolve(MarkizaEpizodesExtractor.extractStreamUrls(streamInfo));
        service.fetchingStreams = false;
      });
      return defered.promise;
    };
    
    return service;
  });
