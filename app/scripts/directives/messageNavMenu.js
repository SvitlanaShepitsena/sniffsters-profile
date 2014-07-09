var messageNavMenu = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/message-nav-menu.html',
        transclude: true,
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
