
var myDirective = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/my-directive.html',
        transclude: true,
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
