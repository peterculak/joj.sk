angular.module('joj.shared')

  .controller('HomeCtrl', function (JojService, $sce, Player, $timeout) {
    'use strict';

    var ctrl = this;
    var player;

    ctrl.url = 'http://varenie.joj.sk/moja-mama-vari-lepsie-ako-tvoja-archiv/2016-03-04-moja-mama-vari-lepsie-ako-tvoja-premiera.html';

    ctrl.streams = [];
    ctrl.epizodes = [];
    ctrl.videoSrc = '';

    ctrl.playing = null;

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
      if (vxgPlayer && vxgPlayer.isPlaying()) {
        vxgPlayer.stop();
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
      ctrl.reset();
      ctrl.playing = 'dajtoStream';
      $timeout(function () {
        loadStream('dajto', 'http://cdn.srv.markiza.sk/plive/dajto.smil/manifest.m3u8');
      });
    };

    var vxgPlayer;
    var dajtoVideo;

    ctrl.playNova = function () {
      ctrl.reset();
      ctrl.playing = 'vgx';
      playVxg('http://212.79.96.134:8003/');
    };

    ctrl.playNovaCinema = function () {
      ctrl.reset();
      ctrl.playing = 'vgx';
      playVxg('http://212.79.96.134:8020/');
    };

    ctrl.playPrima = function () {
      ctrl.reset();
      ctrl.playing = 'vgx';
      playVxg('http://212.79.96.134:8004/');
    };

    ctrl.playPrimaLove = function () {
      ctrl.reset();
      ctrl.playing = 'vgx';
      playVxg('http://212.79.96.134:8019/');
    };

    ctrl.playPrimaZoom = function () {
      ctrl.reset();
      ctrl.playing = 'vgx';
      playVxg('http://iptv.klfree.cz:8011');
    };

    ctrl.playOcko = function () {
      ctrl.reset();
      ctrl.playing = 'vgx';
      playVxg('http://81.201.52.159:8016');
    };

    var playVxg = function (url) {
      $('#vxgPlayerWrapper').removeClass('hidden');
      if (!vxgPlayer) {
        vxgPlayer = vxgplayer('vxg_media_player');
      }
      vxgPlayer.src(url);
      $timeout(function(){
        vxgPlayer.play();
      }, 1000);
      $timeout(function () {
        $('.vxgplayer-loader').addClass('hidden');
      }, 3000);
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
