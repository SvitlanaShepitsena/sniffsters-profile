/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IAboutInfoEdit extends ng.IScope {
    test:string;
}

var aboutInfoEdit:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/about-info-edit.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:IAboutInfoEdit, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {



        }
    }
}
