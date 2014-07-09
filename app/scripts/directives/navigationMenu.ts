/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface INavigationMenu extends ng.IScope {
    test:string;
}

var navigationMenu:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/navigation-menu.html',
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:INavigationMenu, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {


        }
    }
}
