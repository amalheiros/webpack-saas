'use strict';

require('angular');
require('angular-route');
var appModule = require('../../App');

angular.element(document).ready(function () {
  angular.bootstrap(document, [appModule.name], {
   });
});

appModule.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/primeiro-acesso', {
        templateUrl: 'index.html',
        controller: 'firstAccessController'
      }).
      when('/404', {
        templateUrl: '404.html'
      }).
      otherwise({
        redirectTo: '/404'
      });
  }]);