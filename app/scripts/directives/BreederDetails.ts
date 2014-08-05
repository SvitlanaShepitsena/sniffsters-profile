/// <reference path="../app.ts" />
interface IDBreederDetails extends ng.IScope {
    IsEdit:Boolean;
    ctrl:IndexCtrl;
    Edit:() => void;
    Cancel:() => void;
    Save:() => void;
}

var breederDetails = () => {


    return{
        restrict: 'E',
        templateUrl: 'views/directives/breeder-details.html',
        // replace directive tag with template info
        replace: true,
        link: (scope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
//            SCOPE (USE just {{test}} . )

            scope.IsEdit = false;

            scope.b = {};
            scope.b.profile = {};
            scope.b.profile.UserName = scope.index.BreederName;
//            console.log(scope.index.BreederName);


            scope.Edit = () => {
                scope.ctrl.Clone();
                scope.IsEdit = true;
            }


            scope.Cancel = () => {
                scope.IsEdit = false;
            }

            scope.Save = () => {
                scope.ctrl.Save(scope.ctrl.BreederProfileCopy);
                scope.IsEdit = false;
            }
        },
        controller($scope) {
            $scope.message = {};
        }
    }
}