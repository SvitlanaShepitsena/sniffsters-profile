/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IUserProfileNav extends ng.IScope {
    test:string;
}

var userProfileNav:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/user-profile-nav.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:IUserProfileNav, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {


        }
    }
}
