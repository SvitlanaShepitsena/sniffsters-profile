/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IRandomGallery extends ng.IScope {
    test:string;
}

var randomGallery:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/random-gallery.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:IRandomGallery, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {


        }
    }
}
