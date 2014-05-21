/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IUserInfoEdit extends ng.IScope {
    test:string;
}

var userInfoEdit:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/user-info-edit.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:IUserInfoEdit, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {



        }
    }
}
