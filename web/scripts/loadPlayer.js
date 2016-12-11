function loadStream (url, autoplay) {
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