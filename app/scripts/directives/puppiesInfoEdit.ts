/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IPuppiesInfoEdit extends ng.IScope {
    test:string;
}

var puppiesInfoEdit:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/puppies-info-edit.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:IPuppiesInfoEdit, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {



        }
    }
}
