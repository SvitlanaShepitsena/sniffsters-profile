/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

var testimonialsInfo = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/testimonials-info.html',
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
//# sourceMappingURL=testimonialsInfo.js.map
