/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

class PlankeeperService {
    constructor() {
    }

    setPlan(plan:string) {
        this.plan = plan;
    }

    plan:string;

}