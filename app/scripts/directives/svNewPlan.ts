/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />


var svNewPlan:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/sv-new-plan.html',
        replace: true
    }
}
