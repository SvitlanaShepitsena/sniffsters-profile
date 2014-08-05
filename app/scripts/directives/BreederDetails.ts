/// <reference path="../app.ts" />
interface IDBreederDetails extends ng.IScope {
    IsEdit:Boolean;
    ctrl:IndexCtrl;
    Edit:() => void;
    Cancel:() => void;
    Save:() => void;
}

var breederDetails = (FinduserService) => {


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
        }
        /*        controller: ($scope, $modal, DataService, settings, toastr) => {
         $scope.ShowSuccess = (note:string) => {
         toastr.success(note);
         }


         $scope.message = {};
         $scope.b = {};
         $scope.b.profile = {};

         $scope.modalMessage = $modal({
         "title": "New Message",
         scope: $scope,
         show: false,
         template: "../views/modals/admin-message.html"
         });
         $scope.showMessage = (receiverUserName, receiverNickname) => {
         $scope.b.profile.UserName = receiverUserName;
         $scope.modalMessage.show();
         }

         $scope.sendNewMessage = (sender, addressat, isBreeder) => {

         var body = $scope.message.body;
         var levelUp = false;

         var to = addressat;
         FinduserService.find(to).then((userToProfile)=> {
         // UserTo is in DB
         //                        FROM ##############################
         if ($scope.home.isBreeder === true) {
         DataService.sendReply($scope.home.userName, userToProfile.Email, userToProfile.UserName, body, true).then(() => {
         })
         }
         if ($scope.home.isBreeder === false) {
         DataService.sendLookerReply($scope.home.userName, userToProfile.Email, userToProfile.UserName, body, true).then(() => {
         })
         }

         //                TO #################################

         if (userToProfile.isBreeder === true) {
         DataService.sendReply(userToProfile.Email, $scope.home.userName, $scope.home.nickName, body, false).then(() => {

         $scope.ShowSuccess(settings.messageSuccessNotice);
         })
         }
         if (userToProfile.isBreeder === false) {
         DataService.sendLookerReply(userToProfile.Email, $scope.home.userName, $scope.home.nickName, body, false).then(() => {
         $scope.note.body = "";
         $scope.note.to = "";
         $scope.reply.body = "";

         $scope.ShowSuccess(settings.messageSuccessNotice);
         })
         }

         });


         $scope.message = {};
         }
         }*/
    }
}