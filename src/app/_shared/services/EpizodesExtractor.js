angular.module('joj.shared')

  .factory('EpizodesExtractorService', function ($q) {

    var service = {};

    service.extractEpizodes = function (data) {
      var re = /href="(http:\/\/varenie.joj.sk.*-archiv.*html)"/gmi;
      var matches = [];
      while ((match = re.exec(data.contents)) != null) {
        matches.push(match[1]);
      }
      return matches;
    };

    service.getVideoId = function (data) {
      var re = /data-divid="(.*?)-/;
      var match = re.exec(data.contents)
      return match[1];
    };

    service.extractStreamUrls = function (data) {
      var re = /path="(.*?)"/gmi;
      var matches = [];
      while ((match = re.exec(data)) != null) {
        matches.push(match[1]);
      }
      return matches;
    };

    return service;
  });
