/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

var photoGalleries = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photo-galleries.html',
        // replace directive tag with template info
        replace: true
    };
};
