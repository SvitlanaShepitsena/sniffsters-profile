// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../services/DataService.ts" />

interface IGalleryNew extends ng.IScope {
    test:string;
}

var galleryNew:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/gallery-new.html',
        // replace directive tag with template info
        replace: true,

        link: (scope:IGalleryNew, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {

        }
    }
}
