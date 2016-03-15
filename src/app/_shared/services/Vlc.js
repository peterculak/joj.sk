angular.module('joj.shared')

  .factory('VlcService', function () {

    var service = {};

    service.isInstalled = function () {
      return isVLCInstalled();
    };

    var isVLCInstalled = function() {
      var name = "VLC";
      if (navigator.plugins && (navigator.plugins.length > 0)) {
        for(var i=0;i<navigator.plugins.length;++i)
          if (navigator.plugins[i].name.indexOf(name) != -1)
            return true;
      }
      else {
        try {
          new ActiveXObject("VideoLAN.VLCPlugin.2");
          return true;
        } catch (err) {}
      }
      return false;
    };

    return service;
  });
