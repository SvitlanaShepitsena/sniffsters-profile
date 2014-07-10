/// <reference path="../app.ts" />

interface IAboutInfo extends ng.IScope {
    test:string;
    ctrl:IndexCtrl;
    home:HomeCtrl;
}

var aboutInfo:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/about-info.html',

        // replace directive tag with template info
        replace: true,
        link: (scope:IAboutInfo, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
//            SCOPE (USE just {{test}} . )
            scope.home.url = 'about';
        }
    }
}
