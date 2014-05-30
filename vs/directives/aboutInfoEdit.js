/// <reference path="../app.ts" />
var aboutInfoEdit = function () {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/about-info-edit.html',
    transclude: true,
    replace: true,
    scope: {
      ctrl: '=',
      text: '@',
      func: '&'
    },
    link: function (scope, element, attrs) {
      //            SCOPE (USE just {{test}} . )
      scope.saved = false;
      scope.ResetFields = function () {
        console.log('reset');
        scope.ctrl.BreederProfileEdit = new BreederProfile();
      };
      scope.SaveKennelName = function () {
        var breederProfileOriginal = scope.ctrl.GetClone();
        breederProfileOriginal.KennelName = scope.ctrl.BreederProfileEdit.KennelName;
        breederProfileOriginal.Story = scope.ctrl.BreederProfileEdit.Story;
        scope.ctrl.Save(breederProfileOriginal);
      };
      scope.SaveAboutParents = function () {
        var breederProfileOriginal = scope.ctrl.GetClone();
        breederProfileOriginal.Parents = scope.ctrl.BreederProfileEdit.Parents;
        breederProfileOriginal.Girls = scope.ctrl.BreederProfileEdit.Girls;
        breederProfileOriginal.Boys = scope.ctrl.BreederProfileEdit.Boys;
        scope.ctrl.Save(breederProfileOriginal);
      };
      scope.SaveAddInfo = function () {
        var breederProfileOriginal = scope.ctrl.GetClone();
        breederProfileOriginal.AddInfo = scope.ctrl.BreederProfileEdit.AddInfo;
        scope.ctrl.Save(breederProfileOriginal);
      };
      scope.Save = function () {
        scope.ctrl.Save(scope.ctrl.BreederProfileEdit);  //                scope.IsEdit = false;
      };
    }
  };
};  //# sourceMappingURL=aboutInfoEdit.js.map
