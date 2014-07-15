/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface ILookerProfileNav extends ng.IScope {
    test:string;
}

var lookerProfileNav:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/looker-profile-nav.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:ILookerProfileNav, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {


        }
    }
}
