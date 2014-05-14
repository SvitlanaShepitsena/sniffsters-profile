/// <reference path="../app.ts" />

interface I#uname# extends ng.IScope {
    test:string;
}

var #jname#:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/#dname#.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:I#uname#, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
//            SCOPE (USE just {{test}} . )
            scope.test = 'Test from link scope';


        }
    }
}
