/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface ICover extends ng.IScope {
    test:string;
}

var cover:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/cover.html',
        // replace directive tag with template info
        replace: true,
        link: (scope:ICover, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
        }
    }
}
