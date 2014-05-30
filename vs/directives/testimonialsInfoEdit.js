/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
var testimonialsInfoEdit = function () {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/testimonials-info-edit.html',
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
};  //# sourceMappingURL=testimonialsInfoEdit.js.map
