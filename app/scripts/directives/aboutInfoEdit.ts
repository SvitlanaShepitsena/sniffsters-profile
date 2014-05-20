/// <reference path="../app.ts" />

interface IAboutInfoEdit extends ng.IScope {
    test:string;
    SaveKennelName:() => void;

    ctrl:EditCtrl;
    KennelNameValid:boolean;
    KennelNameValidityCheck:() => boolean;
    aboutInfo:HTMLFormElement;
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

            scope.SaveKennelName = () => {
                var breederProfile:IBreederProfile = scope.ctrl.GetClone();

                breederProfile.KennelName = scope.ctrl.BreederProfileEdit.KennelName;
                breederProfile.Story = scope.ctrl.BreederProfileEdit.Story;

                scope.ctrl.Save(breederProfile);


            }

//            scope.form


            scope.KennelNameValidityCheck = () => {
                if (scope.form.kennel.$invalid )
                    return true;

                return false;
            }

            scope.KennelNameValid = scope.KennelNameValidityCheck();
        }
    }
}
