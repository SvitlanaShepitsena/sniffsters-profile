/// <reference path="../app.ts" />

var aboutInfo = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/about-info.html',
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',
            text: '@',
            func: '&'
        },
        link: function (scope, element, attrs) {
            //            SCOPE (USE just {{test}} . )
            scope.ctrl.url = 'about';
        }
    };
};
