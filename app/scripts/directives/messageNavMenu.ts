/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IMessageNavMenu extends ng.IScope {
    test:string;
}

var messageNavMenu:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/message-nav-menu.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:IMessageNavMenu, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {


        }
    }
}
