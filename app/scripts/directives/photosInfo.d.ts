/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
interface IPhotosInfo extends ng.IScope {
    test: string;
    ctrl: IndexCtrl;
    pnumbers: number;
}
declare var photosInfo:() => ng.IDirective;
