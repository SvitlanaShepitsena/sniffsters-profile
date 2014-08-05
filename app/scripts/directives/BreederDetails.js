/// <reference path="../app.ts" />

var breederDetails = function (FinduserService) {
    return {
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
        link: function (scope, element, attrs) {
            //            SCOPE (USE just {{test}} . )
            scope.IsEdit = false;

            scope.Edit = function () {
                scope.ctrl.Clone();
                scope.IsEdit = true;
            };

            scope.Cancel = function () {
                scope.IsEdit = false;
            };

            scope.Save = function () {
                scope.ctrl.Save(scope.ctrl.BreederProfileCopy);
                scope.IsEdit = false;
            };
        }
    };
};
