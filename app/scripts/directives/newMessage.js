
var newMessage = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/new-message.html',
        replace: true,
        controller: function ($scope, $state, DataService, toastr) {
            $scope.note = { to: "", body: "" };
            $scope.Send = function (to, body) {
                DataService.sendNewMessage($scope.home.IdFire, to, body).then(function () {
                    $scope.note.to = "";
                    $scope.note.body = "";
                    toastr.success('Your message has been sent');

                    $state.go('^');
                });
            };
        }
    };
};
