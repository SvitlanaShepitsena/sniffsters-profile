/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface ISpinDiv extends ng.IScope {
    test:string;
}

var spinDiv:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/spin-div.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:ISpinDiv, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {



        }
    }
}
