/* global angular */

(function () {
  'use strict';

  /* @ngInject */
  function Controller ($scope) {
    console.log($scope)
  }

  angular
    .module('golf-parc', [])
    .controller('controller', Controller);
})();
