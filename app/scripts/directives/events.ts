/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IEvents extends ng.IScope {
    test:string;
}

var events:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/events.html',
        // replace directive tag with template info
        replace: true,

        link: (scope:IEvents, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
        }
    }
}
