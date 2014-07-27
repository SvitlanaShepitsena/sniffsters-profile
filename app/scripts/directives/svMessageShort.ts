/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />


var svMessageShort:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/sv-message-short.html',
        replace: true,

        controller($scope) {

            $scope.message = {};

            $scope.isFormShown = $scope.showMessages.indexOf(0);

            $scope.sendAdminMessage = () => {

            }
            $scope.cancelAdminMessage = () => {

            }
        },
        link: (scope, element, attrs) => {


        }
    }
}
