/// <reference path="../app.ts" />

var breederDetails = function (FinduserService) {
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
        controller: function ($scope, $modal, DataService, settings, toastr) {
            $scope.ShowSuccess = function (note) {
                toastr.success(note);
            };

            $scope.message = {};
            $scope.b = {};
            $scope.b.profile = {};

            $scope.modalMessage = $modal({
                "title": "New Message",
                scope: $scope,
                show: false,
                template: "../views/modals/admin-message.html"
            });
            $scope.showMessage = function (receiverUserName, receiverNickname) {
                $scope.b.profile.UserName = receiverUserName;
                $scope.modalMessage.show();
            };

            $scope.sendNewMessage = function (sender, addressat, isBreeder) {
                var body = $scope.message.body;
                var levelUp = false;

                var to = addressat;
                FinduserService.find(to).then(function (userToProfile) {
                    // UserTo is in DB
                    //                        FROM ##############################
                    if ($scope.home.isBreeder === true) {
                        DataService.sendReply($scope.home.userName, userToProfile.Email, userToProfile.UserName, body, true).then(function () {
                        });
                    }
                    if ($scope.home.isBreeder === false) {
                        DataService.sendLookerReply($scope.home.userName, userToProfile.Email, userToProfile.UserName, body, true).then(function () {
                        });
                    }

                    //                TO #################################
                    if (userToProfile.isBreeder === true) {
                        DataService.sendReply(userToProfile.Email, $scope.home.userName, $scope.home.nickName, body, false).then(function () {
                            $scope.ShowSuccess(settings.messageSuccessNotice);
                        });
                    }
                    if (userToProfile.isBreeder === false) {
                        DataService.sendLookerReply(userToProfile.Email, $scope.home.userName, $scope.home.nickName, body, false).then(function () {
                            $scope.note.body = "";
                            $scope.note.to = "";
                            $scope.reply.body = "";

                            $scope.ShowSuccess(settings.messageSuccessNotice);
                        });
                    }
                });

                $scope.message = {};
            };
        }
    };
};
