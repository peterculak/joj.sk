angular.module('joj.shared')

  .factory('EpizodesExtractorService', function ($q) {

    var service = {};

    service.extractEpizodes = function (data) {
      var data = data.contents.replace(/(?:\r\n|\r|\n)/g, '');
      //var re = /href="(http:\/\/varenie.joj.sk.*-archiv.*html)"/gmi;
      var re = /<html.*\/html>/gmi;
      var match = re.exec(data);
      var obj = $(match[0]);

      var ep = $('.episodeListing > .box-carousel', obj);
      var epizodes = $('li', ep);

      var matches = [];

      epizodes.each(function(key, epizode){
        var a = $('a', epizode);
        var date = $('.date', epizode);
        var title = $('.title', epizode);
        if (date.html().indexOf('href') === -1) {
          matches.push({
            date: date.html(),
            title: title.html(),
            url: a.attr('href')
          });
        }
      });
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
