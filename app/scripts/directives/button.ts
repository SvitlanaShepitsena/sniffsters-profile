/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IButton extends ng.IScope {
    test:string;
}

var button:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        template: '<button>Test</button>',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:IButton, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {



        }
    }
}
