/// <reference path="../app.ts" />

interface IAboutInfoEdit extends ng.IScope {
    test:string;
    IsEdit:Boolean;
    SaveKennelName:() => void;

    ctrl:EditCtrl;
    KennelNameValid:boolean;
    KennelNameValidityCheck:() => boolean;
    form:HTMLFormElement;

    SaveAboutParents:() => void;

}

var aboutInfoEdit:() => ng.IDirective = () => {

    return{
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
        link: (scope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
//            SCOPE (USE just {{test}} . )
            scope.saved = false;
            scope.SaveKennelName = () => {
                var breederProfile:IBreederProfile = scope.ctrl.GetClone();

                breederProfile.KennelName = scope.ctrl.BreederProfileEdit.KennelName;
                breederProfile.Story = scope.ctrl.BreederProfileEdit.Story;

                scope.ctrl.Save(breederProfile);
//                scope.saved = true;
            }
            scope.SaveAboutParents = () => {
                var breederProfile:IBreederProfile = scope.ctrl.GetClone();

                breederProfile.Parents = scope.ctrl.BreederProfileEdit.Parents;

                scope.ctrl.Save(breederProfile);
            }

            scope.Save = () => {
                scope.ctrl.Save();

            }
//            scope.form
            /*            scope.KennelNameValidityCheck = () => {
             if (scope.form.kennel.$invalid)
             return true;
             return false;
             }

             scope.KennelNameValid = scope.KennelNameValidityCheck();*/
        }
    }
}
