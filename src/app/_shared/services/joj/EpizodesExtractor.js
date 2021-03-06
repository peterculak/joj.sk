angular.module('joj.shared')

  .factory('JojEpizodesExtractor', function ($q) {

    var service = {};

    service.nodes = ['http://n16.joj.sk/storage'];

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

    var extractEpizodes = function (ep) {
      if (ep.length) {
        var epizodes = $('li', ep);
      } else {
        var epizodes = $('article', dom);
      }

      var matches = [];

      epizodes.each(function(key, epizode){
        var a = $('a', epizode);
        var date = $('.date', epizode);
        if (!date.length) {
          var date = $('time', epizode);
        }
        var title = $('.title', epizode);
        if (!title.length) {
          var actualTitle = a.attr('title');
        } else {
          var actualTitle = title.html();
        }
        var image = $('img', epizode);
        var type = $('p.type', epizode);

        var valid = true;
        if (date && date.html()) {
          if (date.html().indexOf('href') > -1) {
            valid = false;
          }
        }

        if (valid) {
          matches.push({
            date: date.html(),
            title: actualTitle,
            type: type.length ? type.html() : null,
            url: a.attr('href'),
            image: image.length ? image.attr('src') : null,
            service: 'joj'
          });
        }
      });
      return matches;
    };

    service.extractEpizodes = function (data) {
      var dom = extractHtmlDocument(data);
      var ep = $('.episodeListing > .box-carousel', dom);
      return extractEpizodes(ep, dom);
    };

    service.getVideoId = function (data) {
      var re = /data-divid="(.*?)-/;
      var match = re.exec(data.contents);
      return match[1];
    };

    service.extractStreamUrls = function (data) {
      var re = /file .*?>/gmi;
      var matches = [];
      while ((match = re.exec(data)) != null) {
        var rep = /path="(.*?)"/gmi;
        var p = rep.exec(match[0]);

        var req = /quality="(.*?)"/gmi;
        var q = req.exec(match[0]);

        var reqId = /id="(.*?)"/gmi;
        var qId = reqId.exec(match[0]);

        matches.push({
          url: service.nodes[0] + '/' + p[1].replace('dat/', ''),
          quality: q[1],
          qualityId: qId[1],
        });
      }
      return matches;
    };

    service.extractWhatsOn = function (data) {
      var dom = extractHtmlDocument(data);
      var ep = $('div.archivePopup div.col3SmallBox', dom);
      return extractEpizodes(ep);
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
