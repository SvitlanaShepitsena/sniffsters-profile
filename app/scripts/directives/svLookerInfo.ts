/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface ISvLookerInfo extends ng.IScope {
    test:string;
}

var svLookerInfo:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/sv-looker-info.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:ISvLookerInfo, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {


        }
    }
}
