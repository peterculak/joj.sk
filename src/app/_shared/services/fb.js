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
