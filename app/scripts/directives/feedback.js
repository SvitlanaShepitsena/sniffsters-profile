var feedback = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/feedback.html',
        replace: true,
        scope: {
            f: '=',
            text: '@',
            func: '&'
        },
        link: function (scope, element, attrs) {
        }
    };
};
//# sourceMappingURL=feedback.js.map
