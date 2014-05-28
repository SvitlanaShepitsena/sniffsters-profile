/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../model/interfaces.d.ts" />
var userProfileDirective = (): IDirective => {
    return {
        restrict: 'E',
        templateUrl: '/Scripts/app/profile/templates/userProfile',
        transclude: true,
        scope: {
            user: '=',
            error: '='
        },
        link: (scope: IUserProfile, element, attrs) => {
            scope.display = true;
            scope.edit = () => {
                scope.display = false;
            };
            scope.save = () => {
                scope.display = true;
            };
        }
    };
}