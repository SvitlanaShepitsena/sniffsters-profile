var testimonialsInfo = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/testimonials-info.html',
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
