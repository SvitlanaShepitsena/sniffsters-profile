/// <reference path="../app.ts" />

interface IAboutInfo extends ng.IScope {
    test:string;
    ctrl:IndexCtrl;
}

var aboutInfo:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/about-info.html',

        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:IAboutInfo, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
//            SCOPE (USE just {{test}} . )
            scope.test = 'Test from link scope';
        }
    }
}
