/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface ILitters extends ng.IScope {
    test:string;
}

var litters:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/litters.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:ILitters, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {



        }
    }
}
