/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../controllers/HomeCtrl.ts" />

interface IMessageNavMenu extends IHomeScope {
    test:string;
    home:HomeCtrl;
}

var messageNavMenu:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/message-nav-menu.html',
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
