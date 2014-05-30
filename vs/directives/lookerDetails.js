/// <reference path="../app.ts" />
var lookerDetails = function () {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/looker-details.html',
    transclude: true,
    replace: true,
    scope: {
      ctrl: '=',
      text: '@',
      func: '&'
    },
    link: function (scope, element, attrs) {
      //            SCOPE (USE just {{test}} . )
      scope.test = 'Test from link scope';
    }
  };
};  //# sourceMappingURL=lookerDetails.js.map
