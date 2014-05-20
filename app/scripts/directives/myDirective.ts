/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IMyDirective extends ng.IScope {
    test:string;
}

var myDirective:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/my-directive.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:IMyDirective, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
//            SCOPE (USE just {{test}} . )
            scope.test = 'Test from link scope';


        }
    }
}
