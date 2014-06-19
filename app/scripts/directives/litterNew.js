var litterNew = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/litter-new.html',
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
