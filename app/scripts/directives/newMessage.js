/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angular-ui/angular-ui-router.d.ts" />
/// <reference path="../services/DataService.ts" />
/// <reference path="../controllers/HomeCtrl.ts" />

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
