/// <reference path="../app.ts" />
var breederDetails = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/breeder-details.html',
        // replace directive tag with template info
        replace: true,
        link: function (scope, element, attrs) {
            //            SCOPE (USE just {{test}} . )
            scope.IsEdit = false;

            scope.b = {};
            scope.b.profile = {};
            scope.b.profile.UserName = scope.index.BreederName;

            scope.Edit = function () {
                scope.index.Clone();
                scope.IsEdit = true;
            };

            scope.Cancel = function () {
                scope.IsEdit = false;
            };

            scope.Save = function () {
                scope.index.Save(scope.index.BreederProfileCopy);
                scope.IsEdit = false;
            };
        },
        controller: function ($scope) {
            $scope.message = {};
        }
    };
};
