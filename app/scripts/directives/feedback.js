/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
var feedback = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/feedback.html',
        // replace directive tag with template info
        replace: true,
        scope: {
            f: '=',
            text: '@',
            func: '&'
        },
        link: function (scope, element, attrs) {
        }
    };
};
