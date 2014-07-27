/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />


var svMessageShort:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/sv-message-short.html',
        replace: true,
        scope: {
            addressat: '@'
        },
        controller($scope) {
            $scope.message = {};

            $scope.sendAdminMessage = () => {

            }
            $scope.cancelAdminMessage = () => {

            }
        },
        link: (scope, element, attrs) => {


        }
    }
}
