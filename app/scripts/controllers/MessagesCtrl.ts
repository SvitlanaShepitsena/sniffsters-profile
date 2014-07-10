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

    constructor(public $scope:IMessagesScope, $firebaseSimpleLogin, $modal, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.messages = this;

        $scope.home.hideMenu = true;

        var fref = new Firebase("https://torid-fire-6526.firebaseio.com/");
        $scope.auth = $firebaseSimpleLogin(fref);
        $scope.authAction = new FirebaseSimpleLogin(fref, (error, user) => {
            if (error) {
                // an error occurred while attempting login
                this.ShowError(error.toString());
            } else if (user) {


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

//
            } else {
            }

        });


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