/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface ISvMessages extends ng.IScope {
    test:string;

}

var svMessages:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/sv-messages.html',
        // replace directive tag with template info
        replace: true,
        scope: {
            messages: '=',
            isTrash: '=',

            text: '@',
            func: '&'
        },
        link: (scope:ISvMessages, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
        }
    }
}
