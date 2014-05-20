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
                var breederProfile = scope.ctrl.GetClone();

                breederProfile.KennelName = scope.ctrl.BreederProfileEdit.KennelName;
                breederProfile.Story = scope.ctrl.BreederProfileEdit.Story;

                scope.ctrl.Save(breederProfile);
                //                scope.saved = true;
            };
            scope.SaveAboutParents = function () {
                var breederProfile = scope.ctrl.GetClone();

                breederProfile.Parents = scope.ctrl.BreederProfileEdit.Parents;

                scope.ctrl.Save(breederProfile);
            };

            scope.Save = function () {
                scope.ctrl.Save();
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
