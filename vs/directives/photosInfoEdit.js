/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
var photosInfoEdit = function () {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/photos-info-edit.html',
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
};  //# sourceMappingURL=photosInfoEdit.js.map
