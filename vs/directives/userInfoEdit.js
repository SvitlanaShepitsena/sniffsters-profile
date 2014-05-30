/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
var userInfoEdit = function () {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/user-info-edit.html',
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
};  //# sourceMappingURL=userInfoEdit.js.map
