angular.module('joj.shared')

  .factory("RestJoj", ["Restangular", function(restangular) {
  return restangular.withConfig(function(RestangularConfigurer) {

    RestangularConfigurer.setBaseUrl("http://varenie.joj.sk");
    RestangularConfigurer.setDefaultHeaders({
      'Accept': 'application/json'
    });

  });

}]);

