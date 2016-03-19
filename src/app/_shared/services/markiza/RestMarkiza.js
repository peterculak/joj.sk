angular.module('joj.shared')

  .factory("RestMarkiza", ["Restangular", function(restangular) {
  return restangular.withConfig(function(RestangularConfigurer) {

    RestangularConfigurer.setBaseUrl("http://www.markiza.sk");
    RestangularConfigurer.setDefaultHeaders({
      'Accept': 'application/json'
    });

  });

}]);

