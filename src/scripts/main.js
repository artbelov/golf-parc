(function () {
  'use strict';

  /* @ngInject */
  function MainCtrl ($, _) {
    console.log('Angular:' + angular.version.full, 'jQuery:' + $.fn.jquery, 'Lo-Dash:' + _.VERSION, 'Modernizr:' + Modernizr._version);
  }

  angular
    .module('golf-parc', [])
    .constant('$', $.noConflict())
    .constant('_', _.noConflict())
    .controller('MainCtrl', MainCtrl);
})();
