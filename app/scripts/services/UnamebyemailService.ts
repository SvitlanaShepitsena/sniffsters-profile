/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

class UnamebyemailService {
    constructor(public $q:ng.IQService, public settings, public $firebase) {
    }

    find(username:string) {
        return 1;
    }
}