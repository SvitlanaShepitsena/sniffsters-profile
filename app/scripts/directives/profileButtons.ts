/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IProfileButtons extends ng.IScope {
    test:string;
}

var profileButtons:() => ng.IDirective = () => {

    return{

        restrict: 'E',
        templateUrl: 'views/directives/profile-buttons.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        link: (scope:IProfileButtons, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
        }
    }
}
