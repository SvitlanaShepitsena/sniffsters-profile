/// <reference path="HomeCtrl.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularfire/angularfire.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />

interface IMessagesScope extends IHomeScope {
    messages:MessagesCtrl;
    home:HomeCtrl;


}
class MessagesCtrl {

    fireMessages;

    corrUsers:string[];
    corrUsersFire:string[];

    selectedUser:string;
    selectedUserFire:string;

    selectedUserIndex:number;

    selectedUserMessages:INote[];

    constructor(public $scope:IMessagesScope, $modal, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.messages = this;

        DataService.getMessages($scope.home.IdFire).then((messages:any)=> {
            this.fireMessages = messages;

            var inbox = messages.Inbox;
            this.corrUsersFire = _.keys(inbox);

            this.corrUsers = _.map(this.corrUsersFire, (userFire) => {
                return userFire.toString().replace(/\(p\)/g, '.');
            });

            if (this.selectedUser == null) {
                this.selectedUserIndex = 0;
                this.SetSelectedUser(this.selectedUserIndex);
            }


        })
    }

    SetSelectedUser(arrIndex:number) {
        this.selectedUserIndex = arrIndex;

        this.selectedUserFire = this.corrUsersFire[this.selectedUserIndex];
        this.selectedUser = this.corrUsers[this.selectedUserIndex];

        this.selectedUserMessages = _(this.fireMessages.Inbox[this.selectedUserFire]).values();
    }

    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}