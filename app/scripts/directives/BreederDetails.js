/// <reference path="../app.ts" />

var breederDetails = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/breeder-details.html',
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',
            text: '@',
            func: '&',
            home: '='
        },
        link: function (scope, element, attrs) {
            //            SCOPE (USE just {{test}} . )
            scope.IsEdit = false;

            scope.Edit = function () {
                scope.ctrl.Clone();
                scope.IsEdit = true;
            };

            scope.Cancel = function () {
                scope.IsEdit = false;
            };

            scope.Save = function () {
                scope.ctrl.Save(scope.ctrl.BreederProfileCopy);
                scope.IsEdit = false;
            };
        },
        controller: function ($scope, $modal, $state) {
            //            console.log($scope.ctrl.BreederProfile);
            //            console.log('Hello');
            $scope.b = {};
            $scope.b.profile = {};

            //            $scope.b.profile.UserName = $scope.ctrl.BreederProfile.UserName;
            $scope.modalMessage = $modal({
                "title": "New Message",
                scope: $scope,
                show: false,
                template: "../views/modals/admin-message.html"
            });
            $scope.showMessage = funcion (receiverUserName, receiverNickname) {
                $scope.b.profile.UserName = receiverNickname;
                $scope.modalMessage.show();
            };

            $scope.sendNewMessage = function (sender, addressat, isBreeder) {
                console.log(sender);
                console.log(addressat);
            };

            $scope.message = {};
        }
    };
};
