/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

class GalleryService {
    constructor(public $http:ng.IHttpService, public $q:ng.IQService) {
    }

    Method() {
        return 1;
    }
}