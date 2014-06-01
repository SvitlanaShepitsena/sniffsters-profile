
var lookerDetails = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/looker-details.html',
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
