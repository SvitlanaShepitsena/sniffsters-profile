/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../model/interfaces.d.ts" />
var userProfileDirective = function () {
    return {
        restrict: 'E',
        templateUrl: '/Scripts/app/profile/templates/userProfile',
        transclude: true,
        scope: {
            user: '=',
            error: '='
        },
        link: function (scope, element, attrs) {
            scope.display = true;
            scope.edit = function () {
                scope.display = false;
            };
            scope.save = function () {
                scope.display = true;
            };
        }
    };
};
//# sourceMappingURL=userProfileDirective.js.map
