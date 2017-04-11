'use strict';

//require('./vendor.js')();
var appModule = require('../../App');

angular.element(document).ready(function () {
  angular.bootstrap(document, [appModule.name], {
   });
});