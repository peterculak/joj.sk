angular.module('joj.shared')

  .factory("RestJojPlus", ["Restangular", function(restangular) {
  return restangular.withConfig(function(RestangularConfigurer) {

    RestangularConfigurer.setBaseUrl("http://plus.joj.sk/");
    RestangularConfigurer.setDefaultHeaders({
      'Accept': 'application/json'
    });

  });

}]);
