/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../controllers/LookerProfileCtrl.ts" />

interface ILookerProfileNav extends ng.IScope {
    test:string;
    looker:LookerProfileCtrl;
}

var lookerProfileNav:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/looker-profile-nav.html',
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
