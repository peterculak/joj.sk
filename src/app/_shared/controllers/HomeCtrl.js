angular.module('joj.shared')

  .controller('HomeCtrl', function ($rootScope, $scope, $state, JojService, JojPlusService, WauService, MarkizaService, $sce, Player, Playlist, $timeout, VlcService, $mdSidenav, $mdMedia, $mdDialog, facebookService) {
    'use strict';

    var ctrl = this;
    var player;

    ctrl.playlist = Playlist;

    ctrl.epizodes = [];
    ctrl.videoSrc = '';
    ctrl.isPlaying = false;
    ctrl.channel = '';
    ctrl.loading = true;

    $scope.archive = {};
    $scope.whatson = {};

    $scope.selectedIndex = 0;
    $scope.isMobile = false;

    $scope.showWhatsOn = false;
    if (window.location.pathname === '/' && window.location.search === '') {
      $scope.showWhatsOn = true;
    }

    if (mobileAndTabletcheck()) {
      $scope.selectedIndex = 1;
      $scope.isMobile = mobileAndTabletcheck();
      $scope.showMarkizaEpizodes = 0;
      $scope.showJojEpizodes = 0;
    }

    $scope.jojService = JojService;
    $scope.markizaService = MarkizaService;
    $scope.wauService = WauService;

    ctrl.playing = null;

    var joj = new JojService();
    var jojplus = new JojPlusService();
    var wau = new WauService();
    MarkizaService.getArchive().then(function(r){
      $scope.archive['markiza'] = r.archive;
      $scope.whatson['markiza'] = r.whatson;
      ctrl.loading = false;

      joj.getArchive().then(function(r){
        $scope.archive['joj'] = r.archive;
        $scope.whatson['joj'] = r.whatson;

        jojplus.getArchive().then(function(r){
          $scope.archive['jojplus'] = r.archive;
          $scope.whatson['jojplus'] = r.whatson;

          wau.getArchive().then(function(r){
            $scope.archive['wau'] = r.archive;
            $scope.whatson['wau'] = r.whatson;
          });
        });
      });
    });

    $scope.archiveItem = {};

    $scope.fetchJojEpizodes = function (archiveItem) {
      $scope.showJojEpizodes = true;
      $scope.archive['joj'].epizodes = [];
      joj.getEpizodesList(archiveItem.url).then(function (epizodes) {
        for (var i in epizodes) {
          $scope.archive['joj'].epizodes.push(epizodes[i]);
        }
      });
    };

    $scope.fetchJojPlusEpizodes = function (archiveItem) {
      $scope.showJojPlusEpizodes = true;
      $scope.archive['jojplus'].epizodes = [];
      joj.getEpizodesList(archiveItem.url).then(function (epizodes) {
        for (var i in epizodes) {
          $scope.archive['jojplus'].epizodes.push(epizodes[i]);
        }
      });
    };

    $scope.fetchWauEpizodes = function (archiveItem) {
      $scope.showWauEpizodes = true;
      $scope.archive['wau'].epizodes = [];
      wau.getEpizodesList(archiveItem.url).then(function (epizodes) {
        for (var i in epizodes) {
          $scope.archive['wau'].epizodes.push(epizodes[i]);
        }
      });
    };

    $scope.fetchMarkizaEpizodes = function (archiveItem) {
      $scope.showMarkizaEpizodes = true;
      $scope.archive['markiza'].epizodes = [];
      MarkizaService.getEpizodesList(archiveItem.url).then(function (epizodes) {
        for (var i in epizodes) {
          $scope.archive['markiza'].epizodes.push(epizodes[i]);
        }
      });
    };

    $scope.share = function () {
      var sharedObject = {
        method: 'share',
        href: 'http://streamtv.sk/'
      };
      facebookService.share(sharedObject);
    };

    ctrl.toggleLeft = function () {
      $mdSidenav('left').toggle();
    };

    ctrl.reset = function () {
      document.getElementById("html5video").pause();
      ctrl.epizodes = [];
      ctrl.ta3LiveStreamUrl = '';
      ctrl.videoSrc = '';
      ctrl.playing = '';

      $('#flashHlsVideoPlayer').replaceWith('<div id="flashHlsVideoPlayer"></div>');

      $('#jojLiveStream').hide();
      if (dajtoVideo) {
        dajtoVideo.pause();
      }
      if (ctrl.isChrome()) {
        if (vxgPlayer && vxgPlayer.isPlaying()) {
          vxgPlayer.stop();
        }
      } else {
        document.getElementById('vxgPlayerWrapper__embed').innerHTML = '';
      }

      $('#vxgPlayerWrapper').addClass('vxgHidden');
      $('.vxgplayer-loader').removeClass('hidden');
      $('#flashHlsVideoPlayer').addClass('vxgHidden');
      ctrl.channel = '';
    };

    ctrl.ta3Live = function () {
      ctrl.reset();
      ctrl.playing = 'ta3';
      ctrl.channel = 'ta3';
      ctrl.ta3LiveStreamUrl = $sce.trustAsResourceUrl('http://www.ta3.com/live.html?embed=1');
      $mdSidenav('left').close();
      ga('send', {
        hitType: 'event',
        eventCategory: 'Play',
        eventAction: 'TA3',
        eventLabel: 'live'
      });
      return false;
    };

    ctrl.jojLive = function () {
      ctrl.reset();
      ctrl.playing = 'jojLiveStream';
      ctrl.channel = 'joj';
      joj.playLiveStream('jojLiveStream');
      $mdSidenav('left').close();
      ga('send', {
        hitType: 'event',
        eventCategory: 'Play',
        eventAction: 'JOJ',
        eventLabel: 'live'
      });
      return false;
    };

    ctrl.playJojPlusLive = function () {
      ctrl.reset();
      ctrl.playing = 'jojLiveStream';
      ctrl.channel = 'joj+';
      jojplus.playLiveStream('jojLiveStream');
      $mdSidenav('left').close();
      ga('send', {
        hitType: 'event',
        eventCategory: 'Play',
        eventAction: 'JOJ+',
        eventLabel: 'live'
      });
      return false;
    };

    ctrl.playWauLive = function () {
      ctrl.reset();
      ctrl.playing = 'jojLiveStream';
      ctrl.channel = 'wau';
      wau.playLiveStream('jojLiveStream');
      $mdSidenav('left').close();
      ga('send', {
        hitType: 'event',
        eventCategory: 'Play',
        eventAction: 'WAU',
        eventLabel: 'live'
      });
    };

    ctrl.playJojArchiveItem = function (epizode) {
      ctrl.playing = 'jojArchive';
      ctrl.reset();
      $mdSidenav('left').close();
      ctrl.epizode = epizode;
      joj.getStreamUrls(epizode.url).then(function (streams) {
        ctrl.videoFromArchiveUrl = $sce.trustAsResourceUrl(joj.findHighQualityStream(streams));
        ctrl.playing = 'jojArchive';
        ctrl.channel = epizode.url;
        ga('send', {
          hitType: 'event',
          eventCategory: 'Play',
          eventAction: 'JOJ',
          eventLabel: epizode.url
        });
      });
      return false;
    };

    ctrl.playJojPlusArchiveItem = function (epizode) {
      ctrl.playing = 'jojArchive';
      ctrl.reset();
      $mdSidenav('left').close();
      ctrl.epizode = epizode;
      joj.getStreamUrls(epizode.url).then(function (streams) {
        ctrl.videoFromArchiveUrl = $sce.trustAsResourceUrl(joj.findHighQualityStream(streams));
        ctrl.playing = 'jojArchive';
        ctrl.channel = epizode.url;
        ga('send', {
          hitType: 'event',
          eventCategory: 'Play',
          eventAction: 'JOJ+',
          eventLabel: epizode.url
        });
      });
      return false;
    };

    ctrl.playWauArchiveItem = function (epizode) {
      ctrl.playing = 'jojArchive';
      ctrl.reset();
      $mdSidenav('left').close();
      ctrl.epizode = epizode;
      wau.getStreamUrls(epizode.url).then(function (streams) {
        ctrl.videoFromArchiveUrl = $sce.trustAsResourceUrl(joj.findHighQualityStream(streams));
        ctrl.playing = 'jojArchive';
        ctrl.channel = epizode.url;
        ga('send', {
          hitType: 'event',
          eventCategory: 'Play',
          eventAction: 'WAU',
          eventLabel: epizode.url
        });
      });
      return false;
    };

    ctrl.playMarkizaArchiveItem = function (epizode) {
      ctrl.playing = 'jojArchive';
      ctrl.reset();
      $mdSidenav('left').close();
      ctrl.epizode = epizode;
      MarkizaService.getStreamUrls(epizode.url).then(function (stream) {
        ctrl.playing = 'flashHlsVideo';
        ctrl.channel = epizode.url;
        if (mobileAndTabletcheck()) {
          window.open(stream);
        } else {
          $('#flashHlsVideoPlayer').removeClass('vxgHidden');
          loadStream('flashHlsVideoPlayer', stream);
        }
        ga('send', {
          hitType: 'event',
          eventCategory: 'Play',
          eventAction: 'Markiza',
          eventLabel: epizode.url
        });
      });
      return false;
    };

    ctrl.playCT1 = function () {
      ctrl.reset();
      Player.play('jojLiveStream', [{
        title: 'CT1',
        file: 'http://80.188.78.181/atip/4274100aea8199011d868b4768c56d8e/1457456592116/5115a74bb6df54748296b572ea23baa9/102-tv-pc/1504.m3u8?time=1457456633556'
      }]);
    };

    ctrl.playCT2 = function () {
      ctrl.reset();
      Player.play('jojLiveStream', [{
        title: 'CT2',
        file: 'http://80.188.78.148/atip/8225ff0f13d0e0a92fcde1e5d61f1da1/1457461766384/sess/0b2f74ff8c467b1972e6f4ddeeccbb9b/61924494877123753/1504.k.m3u8'
      }]);
    };

    ctrl.playCT24 = function () {
      ctrl.reset();
      ctrl.playing = 'ct24';
      $timeout(function () {
        ctrl.streamUrl = $sce.trustAsResourceUrl('http://80.188.65.18:80/cdn/uri/get/?token=0aa18f2b7f711c93a7155e6c77801138f2bcf63c&contentType=live&expiry=1457492400&id=2402&playerType=flash&quality=web&region=1&skipIpAddressCheck=false&userId=d93d2980-7d0e-4e30-9877-cda8b6f45d71');
        player = videojs('streamPlaying');
        player.play();
      });
    };

    ctrl.playDajto = function () {
      playM3U8('http://cdn.srv.markiza.sk/plive/dajto.smil/manifest.m3u8');
    };

    ctrl.playSTV2 = function () {
      playM3U8('http://e15.stv.livebox.sk/stv-tv/_definst_/stv2-1.smil/playlist.m3u8?auth=b64:X2FueV98MTQ1NzczMjMxMHw4N2RlZTEyY2U2MDY1YjMzMGI5YWVhNjllOGIzYjA4ZWVhMzkxZjQ0');
    };

    ctrl.playSTV1 = function () {
      playM3U8('http://e22.stv.livebox.sk/stv-tv/_definst_/stv1-2.smil/playlist.m3u8?auth=b64:X2FueV98MTQ1NzczMjU2MXxhMTk0Zjg3OWFlYWIxZWM5ODk3MGFiMTA4NmY0M2ZlMDAyYTQxYjQy');
    };

    var playM3U8 = function (url) {
      ctrl.reset();
      ctrl.playing = 'dajtoStream';
      $timeout(function () {
        loadStream('dajto', url);
        $mdSidenav('left').close();
      });
    };

    ctrl.isChrome = function () {
      return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    };

    if (ctrl.isChrome()) {
      var vxgPlayer = vxgplayer('vxg_media_player');
    }
    var dajtoVideo;

    ctrl.playVgx = function (name) {
      if (!ctrl.isChrome() && !VlcService.isInstalled()) {
        ctrl.vlcMissing = true;
      } else {
        ctrl.vlcMissing = false;
        for (var i in Playlist.vgx) {
          if (Playlist.vgx[i].n === name) {
            ctrl.reset();
            ctrl.playing = 'vgx';
            playVxg(window.atob(Playlist.vgx[i].u));
            ctrl.channel = Playlist.vgx[i].u;
            ga('send', {
              hitType: 'event',
              eventCategory: 'Play',
              eventAction: window.atob(name),
              eventLabel: 'live'
            });
            break;
          }
        }
      }
      $mdSidenav('left').close();
    };

    ctrl.base64decode = function (name) {
      return window.atob(name);
    };

    var openInVlc = function (url) {
      window.open('vlc://' + url);
    };

    var playVxg = function (url) {
      if (mobileAndTabletcheck()) {
        openInVlc(url);
      } else {
        $('#vxgPlayerWrapper').removeClass('vxgHidden');

        if (ctrl.isChrome()) {

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

    ctrl.showHelpDialog = function () {
      $mdDialog.show();
    };

    ctrl.showHelpDialog = function(ev) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'app/_shared/views/help.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: useFullScreen
      })
    };

    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.isMobile = mobileAndTabletcheck();
    }

    $timeout(function(){
      $('#vxgPlayerWrapper').addClass('vxgHidden');
      $('#flashHlsVideoPlayer').addClass('vxgHidden');
      if (!mobileAndTabletcheck()) {
        //ctrl.jojLive();
      }
    }, 2000);

    var loadStream = function (videoId, url) {
      var parameters = {
        src: url,
        autoPlay: "true",
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
          wmode: "direct"
        }
        , {
          name: "flashHlsVideoPlayer"
        }
      );

    };
  });
