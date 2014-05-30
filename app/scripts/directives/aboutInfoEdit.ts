/// <reference path="../app.ts" />

interface IAboutInfoEdit extends ng.IScope {
    test:string;
    IsEdit:Boolean;
    Save:() => void;
    Cancel:() => void;
    SaveKennelName:() => void;

    ctrl:IndexCtrl;
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

//            console.log(scope.form.$dirty=true);
//            console.log(scope.form);

            scope.ResetAllFields = () => {

                scope.ctrl.BreederProfileEdit.KennelName = '';
                scope.ctrl.BreederProfileEdit.Story = '';
                scope.ctrl.BreederProfileEdit.Parents = '';
                scope.ctrl.BreederProfileEdit.Boys = '';
                scope.ctrl.BreederProfileEdit.Girls = '';
                scope.ctrl.BreederProfileEdit.AddInfo = '';
                scope.form.$setDirty();
//                scope.form.$setPristine();
//                scope.form.addInfo.$setPristine();

//                scope.ctrl.BreederProfileEdit = new BreederProfile();
            }

            scope.Next = () => {
//                scope.ctrl.Next('profile.photos');
            }
        }
    }
}
