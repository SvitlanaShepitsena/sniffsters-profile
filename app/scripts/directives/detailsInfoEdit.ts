/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../controllers/DetailsEditCtrl.ts" />

interface IDetailsInfoEdit extends ng.IScope {
    test:string;
    ResetFields: () => void;
    SaveKennelName: () => void;
    ctrl:DetailsEditCtrl;

}

var detailsInfoEdit:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/details-info-edit.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:IDetailsInfoEdit, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {

            scope.ResetFields = () => {
                console.log('reset');
                scope.ctrl.BreederProfileEdit = new BreederProfile();
            }

            scope.SaveKennelName = () => {
                var breederProfileOriginal:IBreederProfile = scope.ctrl.GetClone();

                breederProfileOriginal.KennelName = scope.ctrl.BreederProfileEdit.KennelName;
                breederProfileOriginal.Story = scope.ctrl.BreederProfileEdit.Story;

                scope.ctrl.Save(breederProfileOriginal);

            }
        }
    }
}
