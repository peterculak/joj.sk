angular.module('joj.shared')

  .controller('HomeCtrl', function ($scope, JojService, $sce, Player, Playlist, $timeout, VlcService, $mdSidenav) {
    'use strict';

    var ctrl = this;
    var player;

    ctrl.playlist = Playlist;

    ctrl.url = 'http://varenie.joj.sk/moja-mama-vari-lepsie-ako-tvoja-archiv/2016-03-04-moja-mama-vari-lepsie-ako-tvoja-premiera.html';

    ctrl.streams = [];
    ctrl.epizodes = [];
    ctrl.videoSrc = '';

    ctrl.playing = null;

    ctrl.toggleLeft = function () {
      $mdSidenav('left').toggle();
    };

    ctrl.submit = function () {
      JojService.getEpizodesList(ctrl.url).then(function (epizodes) {
        ctrl.play(epizodes[0]);
        for (var i in epizodes) {
          ctrl.epizodes.push(epizodes[i]);
        }
      });
    };

    ctrl.reset = function () {
      ctrl.epizodes = [];
      ctrl.ta3LiveStreamUrl = '';
      ctrl.videoSrc = '';
      ctrl.playing = '';
      $('#jojLiveStream').hide();
      if (dajtoVideo) {
        dajtoVideo.off();
      }
      if (ctrl.isChrome()) {
        if (vxgPlayer && vxgPlayer.isPlaying()) {
          vxgPlayer.stop();
        }
      }

      $('#vxgPlayerWrapper').addClass('hidden');
      $('.vxgplayer-loader').removeClass('hidden');
    };

    ctrl.ta3Live = function () {
      ctrl.reset();
      ctrl.playing = 'ta3';
      ctrl.ta3LiveStreamUrl = $sce.trustAsResourceUrl('http://www.ta3.com/live.html?embed=1');
      return false;
    };

    ctrl.jojLive = function () {
      ctrl.reset();
      ctrl.playing = 'jojLiveStream';
      JojService.playLiveStream('jojLiveStream');
      return false;
    };

    ctrl.playJojPlusLive = function () {
      ctrl.reset();
      ctrl.playing = 'jojLiveStream';
      JojService.playJojPlusLiveStream('jojLiveStream');
      return false;
    };

    ctrl.playWauLive = function () {
      ctrl.reset();
      ctrl.playing = 'jojLiveStream';
      JojService.playWauLiveStream('jojLiveStream');
    };

    ctrl.play = function (epizode) {
      ctrl.playing = 'jojLiveStream';
      ctrl.reset();
      JojService.getStreamUrls(epizode.url).then(function (streams) {
        ctrl.streams = streams;
        ctrl.videoSrc = $sce.trustAsResourceUrl(streams[streams.length - 1]);
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
      });
    };

    ctrl.isChrome = function () {
      return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    };

    if (ctrl.isChrome()) {
      var vxgPlayer = vxgplayer('vxg_media_player');
    } else {
      var vxgPlayer = document.getElementById("vlc");
    }

    ctrl.vxgPlayerUrl = '';
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
            break;
          }
        }
      }
    };

    ctrl.base64decode = function (name) {
      return window.atob(name);
    };

    var playVxg = function (url) {

      $('#vxgPlayerWrapper').removeClass('hidden');

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
        var vlc = document.getElementById('vlc');
        vlc.playlist.playItem( vlc.playlist.add(url) );
      }
    };

    $timeout(function(){
      $('#vxgPlayerWrapper').addClass('hidden');
      ctrl.jojLive();
    }, 2000);

    var loadStream = function (videoId, url) {
      dajtoVideo = _V_(videoId);
      dajtoVideo.src(url);
      dajtoVideo.on('loadstart',function(){
        dajtoVideo.play();
      });
    };
  });