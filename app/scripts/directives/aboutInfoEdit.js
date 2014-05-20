/// <reference path="../app.ts" />

var aboutInfoEdit = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/about-info-edit.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',
            text: '@',
            func: '&'
        },
        link: function (scope, element, attrs) {
            //            SCOPE (USE just {{test}} . )
            scope.saved = false;
            scope.SaveKennelName = function () {
                var breederProfileOriginal = scope.ctrl.GetClone();

                breederProfileOriginal.KennelName = scope.ctrl.BreederProfileEdit.KennelName;
                breederProfileOriginal.Story = scope.ctrl.BreederProfileEdit.Story;

                scope.ctrl.Save(breederProfileOriginal);
                //                scope.saved = true;
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
                scope.ctrl.Save(scope.ctrl.BreederProfileEdit);
                //                scope.IsEdit = false;
            };
            //            scope.form
            /*            scope.KennelNameValidityCheck = () => {
            if (scope.form.kennel.$invalid)
            return true;
            return false;
            }
            
            scope.KennelNameValid = scope.KennelNameValidityCheck();*/
        }
    };
};
//# sourceMappingURL=aboutInfoEdit.js.map
