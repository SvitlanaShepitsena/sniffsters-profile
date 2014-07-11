/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

var previousPuppies = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/previous-puppies.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        link: function (scope, element, attrs) {
        }
    };
};
