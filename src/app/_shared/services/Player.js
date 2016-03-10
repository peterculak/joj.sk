angular.module('joj.shared')

  .factory('Player', function () {

    var service = {};

    service.play = function (divId, playlist) {
      /** Initialize player **/
      jwplayer.key = "Wr5xvp4jvHH2wMDslR9TbuVH1yKuxwDTFL3SRDLKW3kyYTROjTiYPQ==";
      jwplayer(divId).setup({
        autostart: true,
        controls: true,
        displaytitle: false,
        flashplayer: "https://ssl.p.jwpcdn.com/player/v/7.3.4/jwplayer.flash.swf",
        height: 360,
        ph: 1,
        pid: "attSQxsH",
        playlist: playlist,
        plugins: {"https://assets-jpcust.jwpsrv.com/player/6/6124956/ping.js": {"pixel": "https://content.jwplatform.com/ping.gif"}},
        primary: "html5",
        repeat: false,
        stagevideo: false,
        stretching: "uniform",
        width: 480
      });
    };

    return service;
  });