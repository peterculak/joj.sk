angular.module('joj.shared')

  .factory('jsonpService', function ($q) {

    var service = {};

    service.get = function (url) {
      var defered = $q.defer();
      $.ajaxSetup({
        scriptCharset: "utf-8", //or "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
      });

      $.getJSON('http://whateverorigin.org/get?url=' +
        encodeURIComponent(url) + '&callback=?',
        function (data) {
          defered.resolve(data);
        });
      return defered.promise;
    };

    return service;
  });
