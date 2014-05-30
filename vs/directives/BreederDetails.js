/// <reference path="../app.ts" />
var breederDetails = function () {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/breeder-details.html',
    transclude: true,
    replace: true,
    scope: {
      ctrl: '=',
      text: '@',
      func: '&'
    },
    link: function (scope, element, attrs) {
      //            SCOPE (USE just {{test}} . )
      scope.IsEdit = false;
      scope.Edit = function () {
        scope.ctrl.Clone();
        scope.IsEdit = true;
      };
      scope.Cancel = function () {
        scope.IsEdit = false;
      };
      scope.Save = function () {
        scope.ctrl.Save();
        scope.IsEdit = false;
      };
    }
  };
};  //# sourceMappingURL=BreederDetails.js.map
