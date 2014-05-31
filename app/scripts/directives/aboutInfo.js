
var aboutInfo = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/about-info.html',
        replace: true,
        scope: {
            ctrl: '=',
            text: '@',
            func: '&'
        },
        link: function (scope, element, attrs) {
            scope.test = 'Test from link scope';
        }
    };
};
