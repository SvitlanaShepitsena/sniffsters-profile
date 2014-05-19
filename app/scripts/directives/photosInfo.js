/// <reference path="../app.ts" />

var photosInfo = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photos-info.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',
            text: '@',
            func: '&'
        },
        link: function (scope, element, attrs) {
            //            SCOPE (USE just {{test}} . )
            scope.test = 'Test from link scope';
        }
    };
};
//# sourceMappingURL=photosInfo.js.map
