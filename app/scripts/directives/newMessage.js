
var newMessage = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/new-message.html',
        replace: true,
        controller: function ($scope, $state, DataService) {
            $scope.note = {};
            $scope.Send = function (to, body) {
                DataService.sendNewMessage($scope.home.IdFire, to, body);
            };
        }
    };
};
