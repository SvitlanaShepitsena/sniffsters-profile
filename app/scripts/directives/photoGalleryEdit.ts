/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IPhotoGalleryEdit extends ng.IScope {
    test:string;
}

var photoGalleryEdit:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery-edit.html',
        // replace directive tag with template info
        replace: true

    }
}



