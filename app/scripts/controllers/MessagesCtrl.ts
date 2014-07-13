/// <reference path="HomeCtrl.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularfire/angularfire.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />

interface IMessagesScope extends IHomeScope {
    messages:MessagesCtrl;
    home:HomeCtrl;


}
class MessagesCtrl {

    fireMessages;
    reply:{
        body:string
    }

    selectedUser:string;

    selectedUserIndex:number;
    selectedUserMessages:INote[];

    constructor(public $scope:IMessagesScope, public $filter, $firebaseSimpleLogin, $modal, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
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

                    if (this.selectedUser == null) {
                        this.selectedUserIndex = 0;
                        this.SetSelectedUser(this.selectedUserIndex);
                    }
                })
            } else {
            }
        });
    }

    Delete() {
        this.DataService.deleteConversation(this.$scope.home.FireUname, this.selectedUser).then(() => {
            this.fireMessages = _.without(this.fireMessages, _.findWhere(this.fireMessages, {isTrash: false, userName: this.selectedUser}));
            this.SetSelectedUser(0);
        })
    }

    DeleteForever() {
        this.DataService.deleteForever(this.$scope.home.FireUname, this.selectedUser).then(() => {
            this.fireMessages = _.without(this.fireMessages, _.findWhere(this.fireMessages, {isTrash: false, userName: this.selectedUser}));
            this.SetSelectedUser(0);
        })
    }

    Send() {
        this.DataService.sendReply(this.$scope.home.FireUname, this.selectedUser, this.reply.body).then(() => {
            this.fireMessages.push({amISender: true, body: this.reply.body, sent: Date.now(), isTrash: false, userName: this.selectedUser});
            this.reply.body = "";
        })
    }

    SetSelectedUser(arrIndex:number) {
        this.selectedUserIndex = arrIndex;

        var userNames:string[] = _.map(_.uniq(_.pluck(_.filter(this.fireMessages, (note:INote)=> {
            return note.isTrash === false;
        }), "userName")), (userName:string)=> {
            return userName;
        });
        this.selectedUser = userNames[this.selectedUserIndex];
    }

    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}