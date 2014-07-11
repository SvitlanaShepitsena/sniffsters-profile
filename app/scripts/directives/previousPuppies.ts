/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IPreviousPuppies extends ng.IScope {
    test:string;
}

var previousPuppies:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/previous-puppies.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,

        link: (scope:IPreviousPuppies, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {

        }
    }
}
