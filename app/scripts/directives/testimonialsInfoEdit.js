var testimonialsInfoEdit = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/testimonials-info-edit.html',
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
