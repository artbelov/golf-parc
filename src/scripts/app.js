/* global angular */

(function () {
  'use strict';

  /* @ngInject */
  function MainCtrl ($scope) {
    console.log($scope)
  }

  angular
    .module('golf-parc', [])
    .controller('MainCtrl', MainCtrl);
})();
