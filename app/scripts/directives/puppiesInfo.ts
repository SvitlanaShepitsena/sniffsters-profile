/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IPuppiesInfo extends ng.IScope {
    test:string;
}

var puppiesInfo:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/puppies-info.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:IPuppiesInfo, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {



        }
    }
}
