/// <reference path="../app.ts" />
var aboutInfo = function () {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/about-info.html',
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
};  //# sourceMappingURL=aboutInfo.js.map
