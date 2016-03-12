angular.module('joj.shared')

  .factory('Playlist', function () {

    var service = {};

    service.vgx = [{"name": "Markiza HD", "url": "http://91.219.133.187:8080/udp/239.1.1.1:1234"}, {
      "name": "STV1",
      "url": "http://91.219.133.187:8080/udp/239.1.1.2:1234"
    }, {"name": "STV2", "url": "http://91.219.133.187:8080/udp/239.1.1.3:1234"}, {
      "name": "TV JOJ HD",
      "url": "http://91.219.133.187:8080/udp/239.1.1.4:1234"
    }, /*"url": "http://91.219.133.187:8080/udp/239.1.1.6:1234"
    },*/ {"name": "CT 2", "url": "http://91.219.133.187:8080/udp/239.1.1.7:1234"}, {
      "name": "CT 24",
      "url": "http://91.219.133.187:8080/udp/239.1.1.8:1234"
    }, {"name": "Prima COOL HD", "url": "http://91.219.133.187:8080/udp/239.1.1.9:1234"}, {
      "name": "Slovak Sport",
      "url": "http://91.219.133.187:8080/udp/239.1.1.10:1234"
    }, {"name": "Spektrum HD", "url": "http://91.219.133.187:8080/udp/239.1.1.11:1234"}, {
      "name": "DOMA HD",
      "url": "http://91.219.133.187:8080/udp/239.1.1.12:1234"
    }, {"name": "Lux Televizia", "url": "http://91.219.133.187:8080/udp/239.1.1.13:1234"}, {
      "name": "Noe TV",
      "url": "http://91.219.133.187:8080/udp/239.1.1.14:1234"
    }, {"name": "Nova", "url": "http://91.219.133.187:8080/udp/239.1.1.15:1234"}, {
      "name": "Prima Love",
      "url": "http://91.219.133.187:8080/udp/239.1.1.16:1234"
    }, {"name": "TV Paprika", "url": "http://91.219.133.187:8080/udp/239.1.1.17:1234"}, {
      "name": "Sport 2 HD",
      "url": "http://91.219.133.187:8080/udp/239.1.1.18:1234"
    }, {"name": "Eurosport 1 HD", "url": "http://91.219.133.187:8080/udp/239.1.1.19:1234"}, {
      "name": "tv8",
      "url": "http://91.219.133.187:8080/udp/239.1.1.20:1234"
    }, {"name": "Minimax", "url": "http://91.219.133.187:8080/udp/239.1.1.21:1234"}, {
      "name": "Prima Zoom",
      "url": "http://91.219.133.187:8080/udp/239.1.1.22:1234"
    }, {"name": "DOMA", "url": "http://91.219.133.187:8080/udp/239.1.1.23:1234"}, {
      "name": "DAJTO HD",
      "url": "http://91.219.133.187:8080/udp/239.1.1.24:1234"
    }, {"name": "TV Barrandov", "url": "http://91.219.133.187:8080/udp/239.1.1.25:1234"}, {
      "name": "Filmbox Extra HD",
      "url": "http://91.219.133.187:8080/udp/239.1.1.26:1234"
    }, {"name": "Retro Music TV", "url": "http://91.219.133.187:8080/udp/239.1.1.27:1234"}, {
      "name": "History HD",
      "url": "http://91.219.133.187:8080/udp/239.1.1.28:1234"
    }, {
      "name": "SLAGR TV",
      "url": "http://91.219.133.187:8080/udp/239.1.1.29:1234"
    }, {"name": "Discovery Showcase CZ HD", "url": "http://91.219.133.187:8080/udp/239.1.1.30:1234"}, {
      "name": "Film+",
      "url": "http://91.219.133.187:8080/udp/239.1.1.31:1234"
    }, {"name": "AMC", "url": "http://91.219.133.187:8080/udp/239.1.1.32:1234"}, {
      "name": "JOJ PLUS HD",
      "url": "http://91.219.133.187:8080/udp/239.1.1.33:1234"
    }, {"name": "Disney CZ", "url": "http://91.219.133.187:8080/udp/239.1.1.34:1234"}, {
      "name": "AutoMotorSport HD",
      "url": "http://91.219.133.187:8080/udp/239.1.1.35:1234"
    }, {"name": "LeoTV", "url": "http://91.219.133.187:8080/udp/239.1.1.36:1234"}, {
      "name": "JimJam CZ",
      "url": "http://91.219.133.187:8080/udp/239.1.1.37:1234"
    }, {"name": "Animal Planet CZ", "url": "http://91.219.133.187:8080/udp/239.1.1.38:1234"}, {
      "name": "MTV Europe CZ",
      "url": "http://91.219.133.187:8080/udp/239.1.1.39:1234"
    }, {"name": "Nat Geo Wild CZ HD", "url": "http://91.219.133.187:8080/udp/239.1.1.40:1234"}, {
      "name": "Prima HD",
      "url": "http://91.219.133.187:8080/udp/239.1.1.41:1234"
    }, {
      "name": "Viasat Explore/Spice",
      "url": "http://91.219.133.187:8080/udp/239.1.1.42:1234"
    }, {"name": "Viasat History", "url": "http://91.219.133.187:8080/udp/239.1.1.43:1234"}, {
      "name": "Viasat Nature",
      "url": "http://91.219.133.187:8080/udp/239.1.1.44:1234"
    }, {
      "name": "Nat Geo CZ HD",
      "url": "http://91.219.133.187:8080/udp/239.1.1.45:1234"
    }, {"name": "Fishing and Hunting", "url": "http://91.219.133.187:8080/udp/239.1.1.48:1234"}, {
      "name": "Sport 1 CZ",
      "url": "http://91.219.133.187:8080/udp/239.1.1.49:1234"
    }, {"name": "RTL Austria", "url": "http://91.219.133.187:8080/udp/239.1.1.50:1234"}, {
      "name": "VOX Austria",
      "url": "http://91.219.133.187:8080/udp/239.1.1.51:1234"
    }, {"name": "SUPER RTL A", "url": "http://91.219.133.187:8080/udp/239.1.1.52:1234"}, {
      "name": "EuroNews",
      "url": "http://91.219.133.187:8080/udp/239.1.1.53:1234"
    }, {"name": "Reality Kings CZ", "url": "http://91.219.133.187:8080/udp/239.1.1.54:1234"}, {
      "name": "CT sport",
      "url": "http://91.219.133.187:8080/udp/239.1.1.56:1234"
    }, {"name": "HBO HD", "url": "http://91.219.133.187:8080/udp/239.1.1.57:1234"}, {
      "name": "DAJTO",
      "url": "http://91.219.133.187:8080/udp/239.1.1.60:1234"
    }, {"name": "RiK", "url": "http://91.219.133.187:8080/udp/239.1.1.61:1234"}, {
      "name": "CT 1 HD",
      "url": "http://91.219.133.187:8080/udp/239.1.1.62:1234"
    }, {"name": "CT 2 HD", "url": "http://91.219.133.187:8080/udp/239.1.1.63:1234"}, {
      "name": "CT sport HD",
      "url": "http://91.219.133.187:8080/udp/239.1.1.64:1234"
    }, {"name": "STV1 HD", "url": "http://91.219.133.187:8080/udp/239.1.1.65:1234"}, {
      "name": "STV2 HD",
      "url": "http://91.219.133.187:8080/udp/239.1.1.66:1234"
    }, {"name": "Mnam TV", "url": "http://91.219.133.187:8080/udp/239.1.1.67:1234"}, {
      "name": "JOJ Cinema",
      "url": "http://91.219.133.187:8080/udp/239.1.1.68:1234"
    }, {"name": "Crime and Invest. CZ", "url": "http://91.219.133.187:8080/udp/239.1.1.69:1234"}, {
      "name": "3sat",
      "url": "http://91.219.133.187:8080/udp/239.1.1.70:1234"
    }, {"name": "KiKA", "url": "http://91.219.133.187:8080/udp/239.1.1.71:1234"}, {
      "name": "ZDF",
      "url": "http://91.219.133.187:8080/udp/239.1.1.72:1234"
    }, {"name": "ProSieben", "url": "http://91.219.133.187:8080/udp/239.1.1.78:1234"}, {
      "name": "SAT.1",
      "url": "http://91.219.133.187:8080/udp/239.1.1.79:1234"
    }, {"name": "kabel eins", "url": "http://91.219.133.187:8080/udp/239.1.1.80:1234"}, {
      "name": "Russia Today",
      "url": "http://91.219.133.187:8080/udp/239.1.1.83:1234"
    }, {
      "name": "France 24 (en Fran\u0447ais)",
      "url": "http://91.219.133.187:8080/udp/239.1.1.84:1234"
    }, {
      "name": "TV5MONDE EUROPE",
      "url": "http://91.219.133.187:8080/udp/239.1.1.85:1234"
    }, {"name": "France 24 (in English)", "url": "http://91.219.133.187:8080/udp/239.1.1.86:1234"}, {
      "name": "N/A HD",
      "url": "http://91.219.133.187:8080/udp/239.1.1.100:1234"
    }, {"name": "Ocko TV", "url": "http://91.219.133.187:8080/udp/239.1.1.226:1234"}, {
      "name": "TV Lux",
      "url": "http://91.219.133.187:8080/udp/239.1.1.227:1234"
    }, {"name": "WAU", "url": "http://91.219.133.187:8080/udp/239.1.1.228:1234"}, {
      "name": "Sky Sports 1",
      "url": "rtmp://lb.miplayer.net:1935/goLive/_definst_/ibrodtv21_6vhudlq8"
    }, {
      "name": "Sky Sports 2",
      "url": "rtmp://lb.miplayer.net:1935/goLive/_definst_/ibrodtv22_j5p1mted"
    }, {
      "name": "Sky Sports 3",
      "url": "rtmp://lb.miplayer.net:1935/goLive/_definst_/ibrodtv23_5px3ntfs"
    }, {
      "name": "Sky Sports 4",
      "url": "rtmp://lb.miplayer.net:1935/goLive/_definst_/ibrodtv24_f84rdmkk"
    }, {
      "name": "Sky Sports 5",
      "url": "rtmp://lb.miplayer.net:1935/goLive/_definst_/ibrodtv25_wt250ssk"
    }, {
      "name": "BT Sport Europe",
      "url": "rtmp://lb.miplayer.net:1935/goLive/_definst_/ibrodtvbteu_5msgj44x"
    }, {"name": "BT Sports 1", "url": "http://bit.ly/20JY8YL"}, {
      "name": "BT Sports 2",
      "url": "http://bit.ly/1RTqgYZ"
    }];

    //old playlist
    //ctrl.vgx = [
    //  {
    //    id: 'nova',
    //    url: 'http://212.79.96.134:8003',
    //  },
    //  {
    //    id: 'nova-cinema',
    //    url: 'http://212.79.96.134:8020',
    //  },
    //  {
    //    id: 'prima',
    //    url: 'http://212.79.96.134:8004',
    //  },
    //  {
    //    id: 'prima-love',
    //    url: 'http://212.79.96.134:8019',
    //  },
    //  {
    //    id: 'prima-zoom',
    //    url: 'http://iptv.klfree.cz:8011',
    //  },
    //  {
    //    id: 'ocko',
    //    url: 'http://81.201.52.159:8016',
    //  },
    //  {
    //    id: 'prima-cool',
    //    url: 'http://212.79.96.134:8021',
    //  },
    //  {
    //    id: 'ct1',
    //    url: 'http://212.79.96.134:8001',
    //  },
    //  {
    //    id: 'ct2',
    //    url: 'http://212.79.96.134:8002',
    //  },
    //  {
    //    id: 'ct4',
    //    url: 'http://212.79.96.134:8014',
    //  },
    //  {
    //    id: 'ct24',
    //    url: 'http://212.79.96.134:8015',
    //  }
    //];

    return service;
  });