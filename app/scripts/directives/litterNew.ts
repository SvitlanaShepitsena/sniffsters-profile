/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface ILitterNew extends ng.IScope {
    test:string;
}

var litterNew:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/litter-new.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:ILitterNew, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {


        }
    }
}
