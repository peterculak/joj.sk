angular.module('joj.shared')

  .factory('EpizodesExtractorService', function ($q) {

    var service = {};

    service.extractArchive = function (data) {
      var dom = extractHtmlDocument(data);
      var archiveList = $('.archiveList ul', dom);

      var archiveItems = [];
      archiveList.each(function (key, element) {
        var li = $('li', element);
        var a = $('span.title a', li);
        archiveItems.push({title: a.attr('title'), url: a.attr('href')});
      });
      return archiveItems.sort(function (a, b) {
        return b.title < a.title;
      });
    };

    service.extractEpizodes = function (data) {
      var dom = extractHtmlDocument(data);
      var ep = $('.episodeListing > .box-carousel', dom);
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

    var extractHtmlDocument = function (data) {
      var data = data.contents.replace(/(?:\r\n|\r|\n)/g, '');
      var re = /<html.*\/html>/gmi;
      var match = re.exec(data);
      var obj = $(match[0]);
      return obj;
    };

    return service;
  });
