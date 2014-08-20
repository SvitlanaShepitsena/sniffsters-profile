/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />


var svSvUpgradeNotification = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/sv-sv-upgrade-notification.html',
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        controller($scope) {

        },
        link: (scope, element, attrs) => {


        }
    }
}
