/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
var photosInfo = function () {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/photos-info.html',
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
};  //# sourceMappingURL=photosInfo.js.map
