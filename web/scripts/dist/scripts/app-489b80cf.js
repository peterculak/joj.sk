angular.module('joj', [
  'restangular',
  'angulartics',
  'angulartics.google.analytics',
  'ngMaterial',
  'ui.router',
  'joj.templates',
  'joj.shared'
])

  .config(function ($httpProvider, $locationProvider, RestangularProvider) {
    'use strict';

  //$stateProvider
  //  .state('home', {
  //    url: '/',
  //    templateUrl: 'app/_shared/views/index.html',
  //    controller: 'HomeCtrl as ctrl'
  //  })
  //  .state('404', {
  //    url: '*path', // catch all other URLs, this rule must come last!
  //    templateUrl: 'app/_shared/views/error/404.html'
  //  });

    //$urlRouterProvider.otherwise(function ($injector, $location) {
    //  var state = $injector.get('$state');
    //  state.go('404');
    //  return $location.path();
    //});

    $locationProvider.html5Mode(true);
  })

  .run(function ($rootScope, $timeout, $mdSidenav) {
    'use strict';

    $rootScope.toggleLeft = buildDelayedToggler('left');
    $rootScope.toggleRight = buildToggler('right');
    $rootScope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };

    $rootScope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          //$log.debug("close LEFT is done");
        });
    };
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $rootScope,
          args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            //$log.debug("toggle " + navID + " is done");
          });
      }, 100);
    }
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            //$log.debug("toggle " + navID + " is done");
          });
      }
    }

    window.mobileAndTabletcheck = function() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };

    window.isAndroid = function () {
      var ua = navigator.userAgent.toLowerCase();
      return ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
    }

  });

angular.module('joj.shared', [])

  .run(function ($rootScope) {

  });

angular.module("joj.shared")

.constant("name", "development")

.constant("fbAppId", "438346129704805")

.constant("ga", {
	"url": "streamtv.sk",
	"uid": "UA-74974547-1",
	"anonymizeIp": false,
	"tag": "body"
})

;
angular.module('joj.shared')

  .controller('HomeCtrl', function ($rootScope, $scope, $state, JojService, JojPlusService, WauService, MarkizaService, $sce, Player, Playlist, $timeout, VlcService, $mdSidenav, $mdMedia, $mdDialog, facebookService) {
    'use strict';

    var ctrl = this;
    var player;

    ctrl.playlist = Playlist;

    ctrl.epizodes = [];
    ctrl.videoSrc = '';
    ctrl.isPlaying = false;
    ctrl.loading = false;

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
    $scope.player = Player;

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

    $scope.playItem = function (item) {
      if (item.service === 'markiza') {
        ctrl.playMarkizaArchiveItem(item);
      } else if (item.service === 'joj') {
        ctrl.playJojArchiveItem(item);
      }
    };

    ctrl.toggleLeft = function () {
      $mdSidenav('left').toggle();
    };

    ctrl.ta3Live = function () {
      Player.reset();
      Player.playing = 'ta3';
      Player.ta3LiveStreamUrl = $sce.trustAsResourceUrl('http://www.ta3.com/live.html?embed=1');
      $mdSidenav('left').close();
      ga('send', {
        hitType: 'event',
        eventCategory: 'Play',
        eventAction: 'TA3',
        eventLabel: 'live'
      });
      return false;
    };

    ctrl.playJojArchiveItem = function (epizode) {
      $mdSidenav('left').close();
      Player.playJojArchiveItem(epizode);
      return false;
    };

    ctrl.playJojPlusArchiveItem = function (epizode) {
      Player.playing = 'jojArchive';
      Player.reset();
      $mdSidenav('left').close();
      Player.epizode = epizode;
      joj.getStreamUrls(epizode.url).then(function (streams) {
        Player.videoFromArchiveUrl = $sce.trustAsResourceUrl(joj.findHighQualityStream(streams));
        Player.playing = 'jojArchive';
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
      Player.playing = 'jojArchive';
      Player.reset();
      $mdSidenav('left').close();
      Player.epizode = epizode;
      wau.getStreamUrls(epizode.url).then(function (streams) {
        Player.videoFromArchiveUrl = $sce.trustAsResourceUrl(joj.findHighQualityStream(streams));
        Player.playing = 'jojArchive';
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
      ctrl.playing = 'markizaArchiveItem';
      $mdSidenav('left').close();
      var autoplay = true;
      Player.playMarkizaArchiveItem(epizode, autoplay);
      return false;
    };

    ctrl.isChrome = function () {
      return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    };

    ctrl.playVgx = function (name) {
      if (!ctrl.isChrome() && !VlcService.isInstalled()) {
        Player.vlcMissing = true;
      } else {
        Player.vlcMissing = false;
        for (var i in Playlist.vgx) {
          if (Playlist.vgx[i].n === name) {
            Player.reset();
            Player.playing = 'vgx';
            Player.playVxg(window.atob(Playlist.vgx[i].u));
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

    $timeout(function(){
      $('#vxgPlayerWrapper').addClass('vxgHidden');
    }, 2000);
  });

angular.module('joj.shared')

  .factory('Player', function ($sce, $timeout, MarkizaService, JojService) {

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
angular.module('joj.shared')

  .factory('Playlist', function () {

    var service = {};

    service.vgx = [{"n":"Sk9K","u":"aHR0cDovL24yMS5qb2ouc2svaGxzL2pvai03MjAubTN1OA=="},{"n":"Sk9KKw==","u":"aHR0cDovL24yMS5qb2ouc2svaGxzL2pvanBsdXMtNTQwLm0zdTg="},{"n":"V0FV","u":"aHR0cDovL24yMS5qb2ouc2svaGxzL3dhdS01NDAubTN1OA=="},{"n":"am9qQ2luZW1h","u":"aHR0cDovLzIxMy44MS4xNTMuMjQxL2xpdmUwMDEvY2hhbm5lbDA1N19wNS5zdHJlYW0vRFZSLm0zdTg="},{"n":"RklMTUJPWA==","u":"aHR0cDovLzIxMy44MS4xNTMuMjQxL2xpdmUwMDEvY2hhbm5lbDAxOF9wNS5zdHJlYW0vRFZSLm0zdTg="},{"n":"RGlnaVNwb3J0Mw==","u":"aHR0cDovLzIxMy44MS4xNTMuMjQxL2xpdmUwMDEvY2hhbm5lbDAyNl9wNS5zdHJlYW0vRFZSLm0zdTg="},{"n":"bm92YVNwb3J0MQ==","u":"aHR0cDovLzIxMy44MS4xNTMuMjQxL2xpdmUwMDEvY2hhbm5lbDAyOF9wNS5zdHJlYW0vRFZSLm0zdTg="},{"n":"RXVyb3Nwb3J0Mg==","u":"aHR0cDovLzIxMy44MS4xNTMuMjQxL2xpdmUwMDEvY2hhbm5lbDAxNF9wNS5zdHJlYW0vRFZSLm0zdTg="},{"n":"Q1Qx","u":"aHR0cDovLzIxMy44MS4xNTMuMjQxL2xpdmUwMDEvY2hhbm5lbDAzMV9wNS5zdHJlYW0vRFZSLm0zdTg="},{"n":"Q1Qy","u":"aHR0cDovLzIxMy44MS4xNTMuMjQxL2xpdmUwMDEvY2hhbm5lbDAzMl9wNS5zdHJlYW0vRFZSLm0zdTg="},{"n":"Q1QyNA==","u":"aHR0cDovLzIxMy44MS4xNTMuMjQxL2xpdmUwMDEvY2hhbm5lbDAzM19wNS5zdHJlYW0vRFZSLm0zdTg="},{"n":"RGlzY292ZXJ5","u":"aHR0cDovLzIxMy44MS4xNTMuMjQxL2xpdmUwMDEvY2hhbm5lbDAzNF9wNS5zdHJlYW0vRFZSLm0zdTg="},{"n":"QW5pbWFsUGxhbmV0","u":"aHR0cDovLzIxMy44MS4xNTMuMjQxL2xpdmUwMDEvY2hhbm5lbDAzNl9wNS5zdHJlYW0vRFZSLm0zdTg="},{"n":"Ti9B","u":"aHR0cDovLzIxMy44MS4xNTMuMjQxL2xpdmUwMDEvY2hhbm5lbDA0MF9wNS5zdHJlYW0vRFZSLm0zdTg="},{"n":"U3BlY3RydW0=","u":"aHR0cDovLzIxMy44MS4xNTMuMjQxL2xpdmUwMDEvY2hhbm5lbDA1NF9wNS5zdHJlYW0vRFZSLm0zdTg="},{"n":"U3BlY3RydW1Ib21l","u":"aHR0cDovLzIxMy44MS4xNTMuMjQxL2xpdmUwMDEvY2hhbm5lbDA1Nl9wNS5zdHJlYW0vRFZSLm0zdTg="},{"n":"RW5nbGlzaENsdWI=","u":"aHR0cDovLzIxMy44MS4xNTMuMjQxL2xpdmUwMDEvY2hhbm5lbDAyMF9wNS5zdHJlYW0vRFZSLm0zdTg="},{"n":"QVhO","u":"aHR0cDovLzIxMy44MS4xNTMuMjQxL2xpdmUwMDEvY2hhbm5lbDA0Nl9wNS5zdHJlYW0vRFZSLm0zdTg="},{"n":"TUVHQU1BWA==","u":"aHR0cDovLzIxMy44MS4xNTMuMjQxL2xpdmUwMDEvY2hhbm5lbDA0OV9wNS5zdHJlYW0vRFZSLm0zdTg="},{"n":"SmltSmFt","u":"aHR0cDovLzIxMy44MS4xNTMuMjQxL2xpdmUwMDEvY2hhbm5lbDA1MF9wNS5zdHJlYW0vRFZSLm0zdTg="},{"n":"YW1j","u":"aHR0cDovLzIxMy44MS4xNTMuMjQxL2xpdmUwMDEvY2hhbm5lbDA1Ml9wNS5zdHJlYW0vRFZSLm0zdTg="},{"n":"Tm9l","u":"aHR0cDovLzIxMi43OS45Ni4xMzQ6ODAxNw=="},{"n":"UmV0cm8=","u":"aHR0cDovLzIxMi43OS45Ni4xMzQ6ODAxOA=="},{"n":"MSBDbGFzc2lj","u":"aHR0cDovLzIxMi43OS45Ni4xMzQ6ODAyNA=="},{"n":"U2t5IFNwb3J0cyAx","u":"cnRtcDovL2xiLm1pcGxheWVyLm5ldDoxOTM1L2dvTGl2ZS9fZGVmaW5zdF8vaWJyb2R0djIxXzZ2aHVkbHE4"},{"n":"U2t5IFNwb3J0cyAy","u":"cnRtcDovL2xiLm1pcGxheWVyLm5ldDoxOTM1L2dvTGl2ZS9fZGVmaW5zdF8vaWJyb2R0djIyX2o1cDFtdGVk"},{"n":"U2t5IFNwb3J0cyAz","u":"cnRtcDovL2xiLm1pcGxheWVyLm5ldDoxOTM1L2dvTGl2ZS9fZGVmaW5zdF8vaWJyb2R0djIzXzVweDNudGZz"},{"n":"U2t5IFNwb3J0cyA0","u":"cnRtcDovL2xiLm1pcGxheWVyLm5ldDoxOTM1L2dvTGl2ZS9fZGVmaW5zdF8vaWJyb2R0djI0X2Y4NHJkbWtr"},{"n":"U2t5IFNwb3J0cyA1","u":"cnRtcDovL2xiLm1pcGxheWVyLm5ldDoxOTM1L2dvTGl2ZS9fZGVmaW5zdF8vaWJyb2R0djI1X3d0MjUwc3Nr"},{"n":"QlQgU3BvcnQgRXVyb3Bl","u":"cnRtcDovL2xiLm1pcGxheWVyLm5ldDoxOTM1L2dvTGl2ZS9fZGVmaW5zdF8vaWJyb2R0dmJ0ZXVfNW1zZ2o0NHg="},{"n":"QlQgU3BvcnRzIDE=","u":"aHR0cDovL2JpdC5seS8yMEpZOFlM"},{"n":"QlQgU3BvcnRzIDI=","u":"aHR0cDovL2JpdC5seS8xUlRxZ1la"}];

    return service;
  });

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

angular.module('joj.shared')

  .factory('facebookService', function ($q, $window, fbAppId) {

    var fbLoadDeferred = $q.defer(),
      fbLoadReady = fbLoadDeferred.promise;

    var facebook = {

      share: function (sharedObject) {
        var shareDeffered = $q.defer();
        fbLoadReady.then(function () {
          FB.ui(sharedObject,
            function(response) {
              if (response && !response.error_code) {
                shareDeffered.resolve(response);
                ga('send', {
                  hitType: 'event',
                  eventCategory: 'Share',
                  eventAction: 'facebook',
                  eventLabel: 'http://streamtv.sk'
                });
              } else {
                shareDeffered.reject(response);
              }
            }
          );
        });
        return shareDeffered.promise;
      }
    };

    $window.fbAsyncInit = function () {
      FB.init({
        appId: fbAppId,
        xfbml: true,
        version: 'v2.5'
      });
      fbLoadDeferred.resolve();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    return facebook;

  });

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

angular.module('joj.shared')

  .directive('video', function(Player, JojService) {
    'use strict';

    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/player/player.html',
      scope: {
        video: '='
      },
      link: function(scope, el) {
        scope.isChrome = function isChrome() {
          return Player.isChrome();
        };
        scope.Player = Player;
        scope.JojService = JojService;

        if (scope.video && scope.video.id) {
          if (scope.video.service === 'markiza') {
            Player.playMarkizaVideoId(scope.video.id, scope.video.autoplay);
          } else if (scope.video.service === 'joj') {
            Player.playJojArchiveVideoId(scope.video.id, scope.video.autoplay);
          }
        }
      }
    };
  });

angular.module('joj.shared')

  .directive('epizodes', function(Player, JojService, MarkizaService, $timeout) {
    'use strict';

    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/epizodes/list.html',
      controller: 'HomeCtrl',
      scope: {
        epizodes: '='
      },
      link: function(scope, el) {
        scope.Player = Player;
        scope.JojService = JojService;
        scope.MarkizaService = MarkizaService;
        scope.loading = false;

        scope.items = [];

        if (scope.epizodes.limit === undefined) {
          $timeout(function(){
            scope.epizodes.limit = 10;
          });
        }

        if (scope.epizodes.url) {
          if (scope.epizodes.url.indexOf('markiza.sk') > -1) {
            scope.loading = true;
            MarkizaService.getEpizodesList(scope.epizodes.url).then(function(r){
              scope.items = r;
              scope.loading = false;
            });
          } else if (scope.epizodes.url.indexOf('joj.sk')) {
            scope.loading = true;
            var joj = new JojService();
            joj.getEpizodesList(scope.epizodes.url).then(function(r){
              scope.items = r;
              scope.loading = false;
            });
          }
        }
      }
    };
  });

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

angular.module('joj.shared')

  .factory('JojService', function (jsonpService, JojEpizodesExtractor, $q, RestJoj) {

    var service = function (){

    };

    service.prototype.api = RestJoj.service('services/Video.php');
    service.prototype.archiveUrl = 'http://www.joj.sk/archiv.html';
    service.prototype.fetchingEpizodes = false;
    service.prototype.fetchingStreams  = false;

    service.prototype.getWhatsOn = function () {
      var defered = $q.defer();
      jsonpService.get(service.archiveUrl).then(function (r) {
        defered.resolve(JojEpizodesExtractor.extractWhatsOn(r));
      });
      return defered.promise;
    };

    service.prototype.getArchive = function () {
      var defered = $q.defer();
      jsonpService.get(service.prototype.archiveUrl).then(function (r) {
        var archive = JojEpizodesExtractor.extractArchive(r);
        var whatson = JojEpizodesExtractor.extractWhatsOn(r);
        defered.resolve({archive: archive, whatson: whatson});
      });
      return defered.promise;
    };

    service.prototype.getEpizodesList = function (url) {
      var defered = $q.defer();
      service.fetchingEpizodes = true;
      jsonpService.get(url).then(function (r) {
        var epizodes = JojEpizodesExtractor.extractEpizodes(r);
        defered.resolve(epizodes);
        service.fetchingEpizodes = false;
      });
      return defered.promise;
    };

    service.prototype.getEpizodeIdFromUrl = function (url) {
      var defered = $q.defer();
      jsonpService.get(url).then(function (r) {
        var videoId = JojEpizodesExtractor.getVideoId(r);
        defered.resolve(videoId);
      });
      return defered.promise;
    };

    service.prototype.getStreamUrls = function (url) {
      var defered = $q.defer();
      service.fetchingStreams = true;
      service.prototype.getEpizodeIdFromUrl(url).then(function (videoId) {
        service.prototype.api.one().get({clip: videoId}).then(function(streamInfo){
          defered.resolve(JojEpizodesExtractor.extractStreamUrls(streamInfo));
          service.fetchingStreams = false;
        });
      });
      return defered.promise;
    };

    service.prototype.getStreamUrlsFromId = function (videoId) {
      var defered = $q.defer();
      service.prototype.api.one().get({clip: videoId}).then(function(streamInfo){
        defered.resolve(JojEpizodesExtractor.extractStreamUrls(streamInfo));
        service.fetchingStreams = false;
      });
      return defered.promise;
    };

    service.prototype.findHighQualityStream = function (streams) {
      var q = [];
      for (var i in streams) {
        q[streams[i]['quality']] = streams[i];
      }
      if (q['720p']) {
        return q['720p']['url'];
      }

      if (q['pal']) {
        return q['pal']['url'];
      }

      if (q['540p']) {
        return q['540p']['url'];
      }

      return streams[streams.length - 1]['url'];
    };

    service.prototype.playLiveStream = function (divId) {
      var flashvars = {
        basePath: "http:\/\/live.joj.sk\/",
        pageId: 4,
        channel: 1,
        playerURL: "http:\/\/player.joj.sk\/JojPlayer.5.7.swf",
        ui: "uiPlay|uiFullScreen|uiLargePlay|uiVolume|uiQuality"
      };
      var params = {
        wmode: "opaque",
        allowFullScreen: "true",
        allowScriptAccess: "always"
      };
      var attributes = {};
      swfobject.embedSWF("http:\/\/player.joj.sk\/JojLivePanel.5.4.swf", divId, "640", "360", "10", "", flashvars, params, attributes);
    };
    
    return service;
  });

angular.module('joj.shared')

  .factory('JojPlusService', function ($q, jsonpService, JojEpizodesExtractor, JojService, RestWau) {

    var service = function (){
      JojService.apply(this, arguments);
    };

    service.prototype = new JojService();
    service.prototype.api = RestWau.service('services/Video.php');
    service.prototype.archiveUrl = 'http://plus.joj.sk/plus-archiv.html';

    service.prototype.playLiveStream = function (divId) {
      var flashvars = {
        basePath: "http:\/\/plus.joj.sk\/",
        pageId: 54,
        channel: 26,
        playerURL: "http:\/\/player.joj.sk\/JojPlayer.5.7.swf",
        ui: "uiPlay|uiFullScreen|uiLargePlay|uiVolume|uiQuality"
      };
      var attributes = {};
      var params = {
        allowFullScreen: "true"
      };
      swfobject.embedSWF("http:\/\/player.joj.sk\/JojLivePanel.5.4.swf", divId, "640", "360", "10", "", flashvars, params, attributes);
    };

    service.prototype.getArchive = function () {
      var defered = $q.defer();

      jsonpService.get(service.prototype.archiveUrl).then(function (r) {
        var archive = JojEpizodesExtractor.extractArchive(r);
        var whatson = JojEpizodesExtractor.extractWhatsOn(r);
        defered.resolve({archive: archive, whatson: whatson});
      });
      return defered.promise;
    };

    return service;
  });

angular.module('joj.shared')

  .factory("RestJoj", ["Restangular", function(restangular) {
  return restangular.withConfig(function(RestangularConfigurer) {

    RestangularConfigurer.setBaseUrl("http://varenie.joj.sk");
    RestangularConfigurer.setDefaultHeaders({
      'Accept': 'application/json'
    });

  });

}]);


angular.module('joj.shared')

  .factory("RestJojPlus", ["Restangular", function(restangular) {
  return restangular.withConfig(function(RestangularConfigurer) {

    RestangularConfigurer.setBaseUrl("http://plus.joj.sk/");
    RestangularConfigurer.setDefaultHeaders({
      'Accept': 'application/json'
    });

  });

}]);

angular.module('joj.shared')

  .factory("RestWau", ["Restangular", function(restangular) {
  return restangular.withConfig(function(RestangularConfigurer) {

    RestangularConfigurer.setBaseUrl("http://wau.joj.sk/");
    RestangularConfigurer.setDefaultHeaders({
      'Accept': 'application/json'
    });

  });

}]);

angular.module('joj.shared')

  .factory('WauService', function (jsonpService, JojEpizodesExtractor, $q, RestJoj, JojService, RestWau) {

    var service = function () {
      JojService.apply(this, arguments);
    };

    service.prototype = new JojService();
    service.prototype.api = RestWau.service('services/Video.php');
    service.prototype.archiveUrl = 'http://wau.joj.sk/wau-archiv.html';

    service.prototype.playLiveStream = function (divId) {
      var flashvars = {
        basePath: "http:\/\/wau.joj.sk\/",
        pageId: 36655,
        channel: 40,
        playerURL: "http:\/\/player.joj.sk\/JojPlayer.5.7.swf",
        ui: "uiPlay|uiFullScreen|uiLargePlay|uiVolume|uiQuality"
      };
      var attributes = {};
      var params = {
        allowFullScreen: "true"
      };
      swfobject.embedSWF("http:\/\/player.joj.sk\/JojLivePanel.5.4.swf", divId, "640", "360", "10", "", flashvars, params, attributes);
    };

    service.prototype.getArchive = function () {
      var defered = $q.defer();

      jsonpService.get(service.prototype.archiveUrl).then(function (r) {
        var archive = JojEpizodesExtractor.extractArchive(r);
        var whatson = JojEpizodesExtractor.extractWhatsOn(r);
        defered.resolve({archive: archive, whatson: whatson});
      });
      return defered.promise;
    };

    return service;
  });

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
            image: image.attr('src'),
            service: 'markiza'
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

angular.module('joj.shared')

  .factory('MarkizaService', function (jsonpService, MarkizaEpizodesExtractor, $q, RestMarkiza) {

    var service = {};

    service.fetchingEpizodes = false;
    service.fetchingStreams  = false;

    service.getWhatsOn = function () {
      var defered = $q.defer();
      jsonpService.get('http://videoarchiv.markiza.sk/uvod').then(function (r) {
        defered.resolve(MarkizaEpizodesExtractor.extractWhatsOn(r));
      });
      return defered.promise;
    };

    service.getArchive = function () {
      var defered = $q.defer();

      jsonpService.get('http://videoarchiv.markiza.sk/uvod').then(function (r) {
        var archive = MarkizaEpizodesExtractor.extractArchive(r);
        var whatson = MarkizaEpizodesExtractor.extractWhatsOn(r);
        defered.resolve({archive: archive, whatson: whatson});
      });
      return defered.promise;
    };


    service.getEpizodesList = function (url) {
      var defered = $q.defer();
      service.fetchingEpizodes = true;
      jsonpService.get(url).then(function (r) {
        var epizodes = MarkizaEpizodesExtractor.extractEpizodes(r);
        defered.resolve(epizodes);
        service.fetchingEpizodes = false;
      });
      return defered.promise;
    };

    service.getEpizodeIdFromUrl = function (url) {
      var last = url.split('/').pop();
      return last.split('_').shift();
    };

    var MarkizaApi = RestMarkiza.service('json/video.json');

    service.getStreamUrls = function (url) {
      var videoId = service.getEpizodeIdFromUrl(url);
      return service.getStreamUrlsFromId(videoId);
    };

    service.getStreamUrlsFromId = function (videoId) {
      var defered = $q.defer();
      service.fetchingStreams = true;
      MarkizaApi.one().get({id: videoId}).then(function(streamInfo){
        defered.resolve(MarkizaEpizodesExtractor.extractStreamUrls(streamInfo));
        service.fetchingStreams = false;
      });
      return defered.promise;
    };
    
    return service;
  });

angular.module('joj.shared')

  .factory("RestMarkiza", ["Restangular", function(restangular) {
  return restangular.withConfig(function(RestangularConfigurer) {

    RestangularConfigurer.setBaseUrl("http://www.markiza.sk");
    RestangularConfigurer.setDefaultHeaders({
      'Accept': 'application/json'
    });

  });

}]);


angular.module("joj.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("app/epizodes/list.html","<div class=\"widget-area\">\n  <ul>\n    <h2 ng-show=\"epizodes.title\" ng-bind=\"epizodes.title\"></h2>\n    <li ng-repeat=\"epizode in items | limitTo: epizodes.limit\"><a href=\"#\" ng-click=\"playItem(epizode)\">{{epizode.title}} ({{epizode.date}})</a></li>\n    <md-progress-circular ng-show=\"loading\" md-mode=\"indeterminate\"></md-progress-circular>\n  </ul>\n</div>");
$templateCache.put("app/player/player.html","<div ng-show=\"Player.playing\" class=\"player-screen\">\n  <div id=\"vxgPlayerWrapper\" class=\"vxgPlayerWrapper vxgHidden\">\n    <div ng-show=\"isChrome()\" class=\"vxgplayer\"\n         id=\"vxg_media_player\"\n         width=\"640\"\n         height=\"360\"\n         url=\"{{vxgPlayerUrl}}\"\n         nmf-src=\"bower_components/vxgplayer/pnacl/Release/media_player.nmf\"\n         nmf-path=\"media_player.nmf\"\n         autohide=\"2\"\n         volume=\"0.7\"\n         avsync\n         controls\n         mute\n         aspect-ratio\n         aspect-ratio-mode=\"1\"\n         auto-reconnect>\n    </div>\n    <div id=\"vxgPlayerWrapper__embed\" ng-show=\"!isChrome()\"></div>\n  </div>\n\n  <iframe id=\"ta3frame\" ng-show=\"Player.playing === \'ta3\'\" ng-src=\"{{Player.ta3LiveStreamUrl}}\" frameborder=\"0\" scrolling=\"no\"></iframe>\n\n  <div id=\"flashHlsVideoPlayer\"></div>\n  <video id=\"html5video\" controls ng-show=\"Player.playing === \'jojArchive\' && !JojService.fetchingStreams && !JojService.fetchingEpizodes\" ng-src=\"{{Player.videoFromArchiveUrl}}\"></video>\n\n</div>");}]);