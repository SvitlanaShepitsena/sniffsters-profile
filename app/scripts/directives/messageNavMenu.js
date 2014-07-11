/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../controllers/HomeCtrl.ts" />

var messageNavMenu = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/message-nav-menu.html',
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
