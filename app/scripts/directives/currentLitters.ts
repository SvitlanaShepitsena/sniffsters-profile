/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface ICurrentLitters extends ng.IScope {
    test:string;
}

var currentLitters:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/current-litters.html',
        // replace directive tag with template info
        replace: true,

        link: (scope:ICurrentLitters, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
        }
    }
}
