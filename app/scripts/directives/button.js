
var button = function () {
    return {
        restrict: 'E',
        template: '<button>Test</button>',
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
