/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

var spinDiv = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/spin-div.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',
            text: '@',
            func: '&'
        },
        link: function (scope, element, attrs) {
        }
    };
};
