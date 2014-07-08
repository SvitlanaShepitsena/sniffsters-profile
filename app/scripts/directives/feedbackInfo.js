/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

var feedbackInfo = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/feedback-info.html',
        transclude: true,
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
