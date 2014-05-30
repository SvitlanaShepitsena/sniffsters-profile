/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
var submitButton = function () {
  return {
    restrict: 'E',
    template: '<button>Test</button>',
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
};  //# sourceMappingURL=submitButton.js.map
