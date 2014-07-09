/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

var userProfileNav = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/user-profile-nav.html',
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
