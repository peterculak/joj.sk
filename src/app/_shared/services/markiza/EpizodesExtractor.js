angular.module('joj.shared')

  .factory('MarkizaEpizodesExtractor', function ($q) {

    var service = {};

    service.nodes = [];

    service.extractArchive = function (data) {
      var dom = extractHtmlDocument(data);
      var archiveList = $('ul.menuTree > li', dom);
      var archiveItems = [];
      archiveList.each(function (key, element) {
        if ($(element).hasClass('has-child')) {
          var a = $('a', $(element).next());
          var parent = $('a', element);
          var title = parent.attr('title');
        } else {
          var a = $('a', element);
          var title = a.attr('title');
        }
        archiveItems.push({title: title, url: a.attr('href')});
      });
      return archiveItems.sort(function (a, b) {
        return b.title < a.title;
      });
    };

    service.extractEpizodes = function (data) {
      var dom = extractHtmlDocument(data);
      var ep = $('div.video-list', dom);
      return extractEpizodes(ep);
    };

    service.getVideoId = function (data) {
      var re = /data-divid="(.*?)-/;
      var match = re.exec(data.contents)
      return match[1];
    };

    /**
     *
     * @param data json
     * @returns {Array}
     */
    service.extractStreamUrls = function (data) {
      return data.playlist[0].baseUrl.replace(':1935','') + '/' + data.playlist[0].url.replace('f4m', 'm3u8');
    };

    service.extractWhatsOn = function (data) {
      var dom = extractHtmlDocument(data);
      var sliderEpizodes = [];

      var ep = $('div.video-list', dom);
      ep.each(function (key, videoGroup) {
        var epizodes = extractEpizodes(videoGroup);
        for (var i in epizodes) {
          sliderEpizodes.push(epizodes[i]);
        }
      });

      return sliderEpizodes;
    };

    var extractEpizodes = function (ep) {
      var epizodes = $('div.item', ep);
      var matches = [];

      epizodes.each(function(key, epizode){
        var imageContainer = $('div.image', epizode);
        var image = $('img', imageContainer);
        var date = $('span.date', epizode);
        var length = $('span.length', epizode);
        var a = $('a', imageContainer);
        var title = $('h2 a', epizode);

        if (a) {
          var data = {
            date: date ? date.html() : null,
            title: title.html(),
            url: a.attr('href'),
            length: length.html(),
            image: image.attr('src')
          };
          matches.push(data);
        }
      });
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
