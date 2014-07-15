/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IBreedInfo extends ng.IScope {
    test:string;
}

var breedInfo:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/breed-info.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:IBreedInfo, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {


        }
    }
}
