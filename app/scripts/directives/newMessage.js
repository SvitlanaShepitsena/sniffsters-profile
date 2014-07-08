var newMessage = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/new-message.html',
        replace: true,
        scope: {
            ctrl: '=',
            text: '@',
            func: '&'
        },
        controller: function (scope, $state, DataService) {
            scope.note = {};
            scope.Send = function (to, body) {
            };
        }
    };
};
