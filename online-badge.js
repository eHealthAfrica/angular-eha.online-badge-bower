;(function() {

  var ngModule = angular.module('eha.online-badge', [
    'eha.online-badge.directive'
  ]);

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule;
  }

})();

;(function() {
  'use strict';
  /**
   * @ngdoc directive
   * @name ehaOnlineBadge
   * @module eha.online-badge
   */
  var ngModule = angular
                  .module('eha.online-badge.directive', []);

  ngModule.directive('ehaOnlineBadge', ['$window', '$timeout', function($window, $timeout) {
    return {
      templateUrl: 'templates/online-badge.template.tpl.html',
      link: function(scope) {
        var states = {
          online: true,
          offline: false
        };
        function addListener(state, online) {
          function setOnline() {
            $timeout(function() {
              scope.online = online;
            });
          }
          $window.addEventListener(state, setOnline, true);
        }
        for (var state in states) {
          addListener(state, states[state]);
        }
        scope.online = $window.navigator.onLine;
      }
    };
  }]);

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule;
  }

})();
