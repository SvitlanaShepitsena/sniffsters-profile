/// <reference path="../app.ts" />

interface IAboutInfoEdit extends ng.IScope {
    test:string;
    IsEdit:Boolean;
    Save:() => void;
    Cancel:() => void;
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
                var breederProfileOriginal:IBreederProfile = scope.ctrl.GetClone();

                breederProfileOriginal.KennelName = scope.ctrl.BreederProfileEdit.KennelName;
                breederProfileOriginal.Story = scope.ctrl.BreederProfileEdit.Story;

                scope.ctrl.Save(breederProfileOriginal);
//                scope.saved = true;
            }
            scope.SaveAboutParents = () => {
                var breederProfileOriginal:IBreederProfile = scope.ctrl.GetClone();

                breederProfileOriginal.Parents = scope.ctrl.BreederProfileEdit.Parents;
                breederProfileOriginal.Girls = scope.ctrl.BreederProfileEdit.Girls;
                breederProfileOriginal.Boys = scope.ctrl.BreederProfileEdit.Boys;

                scope.ctrl.Save(breederProfileOriginal);
            }
            scope.SaveAddInfo = () => {
                var breederProfileOriginal:IBreederProfile = scope.ctrl.GetClone();
                breederProfileOriginal.AddInfo = scope.ctrl.BreederProfileEdit.AddInfo;

                scope.ctrl.Save(breederProfileOriginal);
            }

            scope.Save = () => {
                scope.ctrl.Save(scope.ctrl.BreederProfileEdit);
//                scope.IsEdit = false;

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
