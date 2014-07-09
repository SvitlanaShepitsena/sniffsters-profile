
var newMessage = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/new-message.html',
        replace: true,
        controller: function ($scope, $state, DataService) {
            $scope.Send = function (to, body) {
                DataService.sendNewMessage($scope.home.IdFire, to, body).then(function () {
                    $scope.note.to = "";
                    $scope.note.body = "";
                    console.log('Message has been sent');
                });
            };
        }
    };
};
