angular.module('joj.shared')

  .factory('JojService', function (jsonpService, EpizodesExtractorService, $q, Restangular) {

    var service = {};

    service.nodes = ['http://n16.joj.sk/storage'];


    service.getEpizodesList = function (url) {
      var defered = $q.defer();

      jsonpService.get(url).then(function (r) {
        var epizodes = EpizodesExtractorService.extractEpizodes(r);
        defered.resolve(epizodes);
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
      service.getEpizodeIdFromUrl(url).then(function (videoId) {
        Varenie.one().get({clip: videoId}).then(function(streamInfo){
          var tmp = EpizodesExtractorService.extractStreamUrls(streamInfo);
          var urls = [];
          for (var i in tmp) {
            urls.push(service.nodes[0] + '/' + tmp[i].replace('dat/', ''));
          }
          defered.resolve(urls);
        });
      });
      return defered.promise;
    };
    
    return service;
  });
