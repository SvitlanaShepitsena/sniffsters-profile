
var litterInfo = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/litter-info.html',
        transclude: true,
        replace: true,
        scope: {
            l: '=',
            userName: '@'
        },
        link: function (scope, element, attrs) {
        }
    };
};
