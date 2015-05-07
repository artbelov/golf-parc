(function () {
  'use strict';

  /**
   * Controller of the App
   * @ngInject
   */
  function MainCtrl () {
    console.log('Golf Parc');
  }

  angular
    .module('golf-parc', [])
    .controller('MainCtrl', MainCtrl);
})();
