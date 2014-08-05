/// <reference path="../app.ts" />
interface IDBreederDetails extends ng.IScope {
    IsEdit:Boolean;
    ctrl:IndexCtrl;
    Edit:() => void;
    Cancel:() => void;
    Save:() => void;
}

var breederDetails = () => {

    ShowSuccess(note
    :
    string
    )
    {
        this.toastr.info(note);
    }
    return{
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
        link: (scope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
//            SCOPE (USE just {{test}} . )

            scope.IsEdit = false;

            scope.Edit = () => {
                scope.ctrl.Clone();
                scope.IsEdit = true;
            }

            scope.Cancel = () => {
                scope.IsEdit = false;
            }

            scope.Save = () => {
                scope.ctrl.Save(scope.ctrl.BreederProfileCopy);
                scope.IsEdit = false;
            }
        },
        controller: ($scope, $modal, $state, FinduserService, DataService, settings, toastr) => {
            $scope.b = {};
            $scope.b.profile = {};

            $scope.modalMessage = $modal({
                "title": "New Message",
                scope: $scope,
                show: false,
                template: "../views/modals/admin-message.html"
            });
            $scope.showMessage = (receiverUserName, receiverNickname) => {
                $scope.b.profile.UserName = receiverNickname;
                $scope.modalMessage.show();
            }

            $scope.sendNewMessage = (sender, addressat, isBreeder) => {


                var to = addressat;
                console.log('here');
                this.FinduserService.find(to).then((userToProfile)=> {
                    // UserTo is in DB

//                        FROM ##############################
                    if ($scope.home.isBreeder === true) {
                        this.DataService.sendReply($scope.home.userName, userToProfile.Email, userToProfile.UserName, body, true).then(() => {
                        })
                    }
                    if ($scope.home.isBreeder === false) {
                        this.DataService.sendLookerReply($scope.home.userName, userToProfile.Email, userToProfile.UserName, body, true).then(() => {
                        })
                    }

//                TO #################################

                    if (userToProfile.isBreeder === true) {
                        this.DataService.sendReply(userToProfile.Email, $scope.home.userName, $scope.home.nickName, body, false).then(() => {

                            this.ShowSuccess(this.settings.messageSuccessNotice);
                        })
                    }
                    if (userToProfile.isBreeder === false) {
                        this.DataService.sendLookerReply(userToProfile.Email, $scope.home.userName, $scope.home.nickName, body, false).then(() => {
                            if (levelUp) {
                                this.$state.go('^');
                            }
                            $scope.note.body = "";
                            $scope.note.to = "";
                            $scope.reply.body = "";

                            this.ShowSuccess(this.settings.messageSuccessNotice);
                        })
                    }

                });


                $scope.message = {};
        }
    }
}
