/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../services/DataService.d.ts" />
interface IPhotoGallery extends ng.IScope {
    test: string;
    userName: string;
}
declare var photoGallery:(data:any) => ng.IDirective;
