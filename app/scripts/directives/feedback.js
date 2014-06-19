var feedback = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/feedback.html',
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
