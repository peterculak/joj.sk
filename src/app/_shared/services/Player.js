angular.module('joj.shared')

  .factory('Player', function ($sce, MarkizaService, JojService) {

    var service = {};
    var joj = new JojService();

    service.videoFromArchiveUrl = null;
    service.playing = null;
    service.channel = null;
    service.ta3LiveStreamUrl = null;
    service.epizodes = [];

    service.isChrome = function isChrome() {
      return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    };

    if (service.isChrome()) {
      var vxgPlayer = vxgplayer('vxg_media_player');
    }

    service.playVxg = function (url) {
      if (mobileAndTabletcheck()) {
        openInVlc(url);
      } else {
        $('#vxgPlayerWrapper').removeClass('vxgHidden');

        if (service.isChrome()) {

          $timeout(function () {
            vxgPlayer.src(url);
          }, 1000);

          $timeout(function () {
            vxgPlayer.play();
          }, 2000);

          $timeout(function () {
            $('.vxgplayer-loader').addClass('hidden');
          }, 3000);
        } else {
          var vlc = '<embed width="640" height="360" ng-show="!ctrl.isChrome()" type="application/x-vlc-plugin" pluginspage="http://www.videolan.org" version="VideoLAN.VLCPlugin.2" id="vlc" loop="yes" autoplay="yes" target="' + url + '"></embed>';
          document.getElementById("vxgPlayerWrapper__embed").innerHTML = vlc;
        }
      }
    };

    service.reset = function () {
      document.getElementById("html5video").pause();
      service.epizodes = [];
      service.videoSrc = '';
      service.ta3LiveStreamUrl = '';
      service.playing = '';

      $('#flashHlsVideoPlayer').replaceWith('<div id="flashHlsVideoPlayer"></div>');

      $('#jojLiveStream').hide();

      if (service.isChrome()) {
        if (vxgPlayer && vxgPlayer.isPlaying()) {
          vxgPlayer.stop();
        }
      } else {
        document.getElementById('vxgPlayerWrapper__embed').innerHTML = '';
      }

      $('#vxgPlayerWrapper').addClass('vxgHidden');
      $('.vxgplayer-loader').removeClass('hidden');
      $('#flashHlsVideoPlayer').addClass('vxgHidden');
    };

    service.playMarkizaArchiveItem = function (epizode, autoplay) {
      service.playing = 'markizaArchive';
      service.reset();
      service.epizode = epizode;
      MarkizaService.getStreamUrls(epizode.url).then(function (stream) {
        service.playing = 'flashHlsVideo';
        if (mobileAndTabletcheck()) {
          window.open(stream);
        } else {
          $('#flashHlsVideoPlayer').removeClass('vxgHidden');
          loadStream('flashHlsVideoPlayer', stream, autoplay);
        }
        ga('send', {
          hitType: 'event',
          eventCategory: 'Play',
          eventAction: 'Markiza',
          eventLabel: epizode.url
        });
      });
    };

    service.playMarkizaVideoId = function (id, autoplay) {
      service.playing = 'markizaArchive';
      service.reset();
      MarkizaService.getStreamUrlsFromId(id).then(function (stream) {
        service.playing = 'flashHlsVideo';
        if (mobileAndTabletcheck()) {
          window.open(stream);
        } else {
          $('#flashHlsVideoPlayer').removeClass('vxgHidden');
          loadStream('flashHlsVideoPlayer', stream, autoplay);
        }
        ga('send', {
          hitType: 'event',
          eventCategory: 'Play',
          eventAction: 'Markiza',
          eventLabel: id
        });
      });
    };

    service.playJojArchiveItem = function (epizode) {
      service.playing = 'jojArchive';
      service.reset();
      service.epizode = epizode;
      joj.getStreamUrls(epizode.url).then(function (streams) {
        service.videoFromArchiveUrl = $sce.trustAsResourceUrl(joj.findHighQualityStream(streams));
        service.playing = 'jojArchive';

        ga('send', {
          hitType: 'event',
          eventCategory: 'Play',
          eventAction: 'JOJ',
          eventLabel: epizode.url
        });
      });
    };

    service.playJojArchiveVideoId = function (id, autoplay) {
      service.playing = 'jojArchive';
      service.reset();
      joj.getStreamUrlsFromId(id).then(function (streams) {
        service.videoFromArchiveUrl = $sce.trustAsResourceUrl(joj.findHighQualityStream(streams));
        service.playing = 'jojArchive';

        ga('send', {
          hitType: 'event',
          eventCategory: 'Play',
          eventAction: 'JOJ',
          eventLabel: id
        });
      });
    };

    var openInVlc = function (url) {
      window.open('vlc://' + url);
    };

    var loadStream = function (videoId, url, autoplay) {
      var parameters = {
        src: url,
        autoPlay: autoplay,
        verbose: true,
        controlBarAutoHide: "true",
        controlBarPosition: "bottom",
        //poster: "images/poster.png",
        //javascriptCallbackFunction: "flashlsCallback",
        plugin_hls: "scripts/flashlsOSMF.swf",
        hls_minbufferlength: -1,
        hls_maxbufferlength: 30,
        hls_lowbufferlength: 3,
        hls_seekmode: "KEYFRAME",
        hls_startfromlevel: -1,
        hls_seekfromlevel: -1,
        hls_live_flushurlcache: false,
        hls_info: true,
        hls_debug: false,
        hls_debug2: false,
        hls_warn: true,
        hls_error: true,
        hls_fragmentloadmaxretry : -1,
        hls_manifestloadmaxretry : -1,
        hls_capleveltostage : false,
        hls_maxlevelcappingmode : "downscale",
      };

      // Embed the player SWF:
      swfobject.embedSWF(
        "scripts/StrobeMediaPlayback.swf"
        , "flashHlsVideoPlayer"
        , 640
        , 360
        , "10.1.0"
        , "expressInstall.swf"
        , parameters
        , {
          allowFullScreen: "true",
          wmode: "direct",
          bgcolor: "#000000"
        }
        , {
          name: "flashHlsVideoPlayer"
        }
      );

    };

    return service;
  });