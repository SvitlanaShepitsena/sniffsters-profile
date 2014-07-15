/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface ISvLookerInfoEdit extends ng.IScope {
    test:string;
}

var svLookerInfoEdit:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/sv-looker-info-edit.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:ISvLookerInfoEdit, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {


        }
    }
}
