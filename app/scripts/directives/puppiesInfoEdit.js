
var puppiesInfoEdit = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/puppies-info-edit.html',
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
