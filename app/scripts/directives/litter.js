var litter = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/litter.html',
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
