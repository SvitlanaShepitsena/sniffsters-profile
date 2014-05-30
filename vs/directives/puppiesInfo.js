/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
var puppiesInfo = function () {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/puppies-info.html',
    transclude: true,
    replace: true,
    scope: {
      ctrl: '=',
      text: '@',
      func: '&'
    },
    link: function (scope, element, attrs) {
    }
  };
};  //# sourceMappingURL=puppiesInfo.js.map
