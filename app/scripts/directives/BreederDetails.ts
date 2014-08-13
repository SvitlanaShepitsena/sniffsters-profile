/// <reference path="../app.ts" />

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

            scope.Edit = () => {
                scope.index.Clone();
                scope.IsEdit = true;
            }

            scope.Cancel = () => {
                scope.IsEdit = false;
            }

            scope.Save = () => {
                scope.index.Save(scope.index.BreederProfileCopy);
                scope.IsEdit = false;
            }
        },
        controller($scope) {
            $scope.message = {};
        }
    }
}