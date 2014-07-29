/// <reference path="HomeCtrl.ts" />

interface IUserManagementScope extends IHomeScope {
    management:UserManagementCtrl;
    home:HomeCtrl;
}
class UserManagementCtrl {
    breeders:any;
    lookers:any;
    urlRef:string;

    constructor(public $scope, public $modal, $timeout, public $firebase, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {

        $scope.message = {};
        this.urlRef = $scope.home.MainUrl + 'breeders';
        this.breeders = $firebase(new Firebase(this.urlRef));

        this.urlRef = $scope.home.MainUrl + 'lookers';
        this.lookers = $firebase(new Firebase(this.urlRef));

        $scope.management = this;

        $scope.showMessages = [];

        $scope.modal = {
            "title": "New Message",
            show: true
        };

        $scope.sendAdminMessage = (addressat) => {
            $scope.addressat = addressat;
            $scope.admin = $scope.home.userNameFire;
            var messageTo = new Note();
            messageTo.body = $scope.message.body;
            messageTo.userName = $scope.admin;
            messageTo.isTrash = false;
            messageTo.sent = Date.now();
            messageTo.amISender = false;

            var userType = $scope.isBreeder ? 'breeders' : 'lookers';

            var receiverMessages = $scope.home.MainRefFire.$child(userType).$child($scope.addressat.replace(/\./g, '(p)')).$child('messages');
            receiverMessages.$add(messageTo);

            var messageFrom = new Note();
            messageFrom.body = $scope.message.body;
            messageFrom.userName = $scope.addressat;
            messageFrom.isTrash = false;
            messageFrom.sent = Date.now();
            messageFrom.amISender = true;

            var senderMessages = $scope.home.MainRefFire.$child('admins').$child('messages');
            senderMessages.$add(messageFrom).then(() => {
                toastr.success('Message has been send');
            });
        }
    }

    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}