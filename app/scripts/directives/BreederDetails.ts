/// <reference path="../app.ts" />
interface IDBreederDetails extends ng.IScope {
    IsEdit:Boolean;
    ctrl:IndexCtrl;
    Edit:() => void;
    Cancel:() => void;
    Save:() => void;
}

var breederDetails = (FinduserService) => {


    return{
        restrict: 'E',
        templateUrl: 'views/directives/breeder-details.html',
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',
            text: '@',
            func: '&',
            home: '='
        },
        link: (scope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
//            SCOPE (USE just {{test}} . )

            scope.IsEdit = false;

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
        controller: ($scope, $modal, DataService, settings, toastr) => {
            $scope.b = {};
            $scope.b.profile = {};
            $scope.$watch('ctrl', (index)=> {
                console.log(index.GetBreederName());
                console.log(typeof index);
            })

//            console.log($scope.ctrl);
//            console.log('ddd');
        }
    }
}