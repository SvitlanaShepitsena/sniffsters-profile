/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />


var svStartPlanButton = () => {

    return{
        restrict: 'E',
        replace: true,
        templateUrl: 'views/directives/sv-start-plan-button.html',
        scope: false,
        link: (scope, element, attrs)=> {
            scope.name = attrs['name'];
        }
    }
}
