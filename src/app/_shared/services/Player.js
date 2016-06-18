angular.module('joj.shared')

  .factory('Player', function ($sce, $timeout, MarkizaService, JojService, JojPlusService, WauService) {

    var service = {};
    var joj = new JojService();
    var jojplus = new JojPlusService();
    var wau = new WauService();

    service.videoFromArchiveUrl = null;
    service.playing = null;
    service.channel = null;
    service.ta3LiveStreamUrl = null;
    service.epizodes = [];

    service.isChrome = function isChrome() {
      return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    };

    service.reset = function () {
      document.getElementById("html5video").pause();
      service.epizodes = [];
      service.videoSrc = '';
      service.playing = '';
      service.ta3LiveStreamUrl = $sce.trustAsResourceUrl('');
      $('#flashHlsVideoPlayer').replaceWith('<div id="flashHlsVideoPlayer"></div>');
      $('#jojLiveStream').hide();
      $('#flashHlsVideoPlayer').addClass('vxgHidden');
    };

    service.playTA3Live = function () {
      service.reset();
      service.playing = 'ta3';
      service.ta3LiveStreamUrl = $sce.trustAsResourceUrl('http://www.ta3.com/live.html?embed=1');
    };

    service.playFlashHlsStream = function (url, autoplay) {
      service.reset();
      service.playing = 'flashHlsVideo';
      if (mobileAndTabletcheck()) {
        window.open(url);
      } else {
        $('#flashHlsVideoPlayer').removeClass('vxgHidden');
        loadStream('flashHlsVideoPlayer', url, autoplay);
      }
    };

    service.playMarkizaArchiveItem = function (epizode, autoplay) {
      service.reset();
      service.playing = 'markizaArchive';
      service.epizode = epizode;
      MarkizaService.getStreamUrls(epizode.url).then(function (streamableUrl) {
        service.playFlashHlsStream(streamableUrl, autoplay);
        ga('send', {
          hitType: 'event',
          eventCategory: 'Play',
          eventAction: 'Markiza',
          eventLabel: epizode.url
        });
      });
    };

    service.playMarkizaVideoId = function (id, autoplay) {
      service.reset();
      service.playing = 'markizaArchive';
      MarkizaService.getStreamUrlsFromId(id).then(function (streamableUrl) {
        service.playFlashHlsStream(streamableUrl, autoplay);
        ga('send', {
          hitType: 'event',
          eventCategory: 'Play',
          eventAction: 'Markiza',
          eventLabel: id
        });
      });
    };

    service.playJojArchiveItem = function (epizode) {
      service.reset();
      service.playing = 'jojArchive';
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
      service.reset();
      service.playing = 'jojArchive';
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

    service.playJOJLiveStream = function () {
      service.reset();
      service.playing = 'jojLiveStream';
      joj.playLiveStream('jojLiveStream');
    };

    service.playJOJPlusLiveStream = function () {
      service.reset();
      service.playing = 'jojLiveStream';
      jojplus.playLiveStream('jojLiveStream');
    };

    service.playWAULiveStream = function () {
      service.reset();
      service.playing = 'jojLiveStream';
      wau.playLiveStream('jojLiveStream');
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
        hls_maxlevelcappingmode : "downscale"
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