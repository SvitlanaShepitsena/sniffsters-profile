var navigationMenu = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/navigation-menu.html',
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
