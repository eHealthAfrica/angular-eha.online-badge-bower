angular.module('eha.online-badge.template', ['templates/online-badge.template.tpl.html']);

angular.module("templates/online-badge.template.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/online-badge.template.tpl.html",
    "<span\n" +
    "  class=\"component online-badge label\"\n" +
    "  ng-class=\"online ? 'label-success' : 'label-danger'\"\n" +
    ">\n" +
    "  <span ng-if=\"online\" translate>Online</span>\n" +
    "  <span ng-if=\"!online\" translate>Offline</span>\n" +
    "</span>\n" +
    "");
}]);

;(function() {

  var ngModule = angular.module('eha.online-badge', [
    'eha.online-badge.directive',
    'eha.online-badge.template'
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
