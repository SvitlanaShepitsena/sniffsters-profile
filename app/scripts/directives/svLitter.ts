/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />


var svLitter:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/sv-litter.html',
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
