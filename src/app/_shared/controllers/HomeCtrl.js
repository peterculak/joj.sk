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

    ctrl.ta3Live = function () {
      ctrl.channel = 'ta3';
      Player.playTA3Live();
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

    ctrl.playFlashHlsStream = function (name) {
      var url = findPlaylistUrl(name);
      ctrl.channel = name;
      Player.playFlashHlsStream(url, true, true);
    };

    ctrl.jojLive = function () {
      ctrl.channel = 'joj';
      Player.playJOJLiveStream();
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
      ctrl.channel = 'joj+';
      Player.playJOJPlusLiveStream();
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
      ctrl.channel = 'wau';
      Player.playWAULiveStream();
      $mdSidenav('left').close();
      ga('send', {
        hitType: 'event',
        eventCategory: 'Play',
        eventAction: 'WAU',
        eventLabel: 'live'
      });
    };

    var findPlaylistUrl = function (name) {
      for (var i in Playlist.vgx) {
        if (Playlist.vgx[i].n === name) {
          return window.atob(Playlist.vgx[i].u);
        }
      }
    };

    ctrl.base64decode = function (name) {
      return window.atob(name);
    };
  });
