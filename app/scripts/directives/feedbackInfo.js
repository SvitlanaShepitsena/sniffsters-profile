var feedbackInfo = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/feedback-info.html',
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
