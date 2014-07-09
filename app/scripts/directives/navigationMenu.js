/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

var navigationMenu = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/navigation-menu.html',
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
