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
    isTrash:boolean;
    selectedUser:string;

    selectedUserIndex:number;
    selectedUserMessages:INote[];

    constructor(public $scope:IMessagesScope, public $filter, $firebaseSimpleLogin, $modal, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.messages = this;

        $scope.home.hideMenu = true;

        $scope.home.auth.then(() => {

            DataService.getMessages($scope.home.IdFire).then((messages:any)=> {
                this.fireMessages = messages;
                this.SetSelectedUser(0);
            })
        })
    }

    Delete() {
        this.DataService.deleteConversation(this.$scope.home.userName, this.selectedUser).then(() => {
            _.where(this.fireMessages, {isTrash: false, userName: this.selectedUser}).forEach((message:INote)=> {
                message.isTrash = true;
            })
        })
    }

    Recover() {
        this.DataService.recoverConversation(this.$scope.home.userName, this.selectedUser).then(() => {
            _.where(this.fireMessages, {isTrash: true, userName: this.selectedUser}).forEach((message:INote)=> {
                message.isTrash = false;
            })
//            this.SetSelectedUser(0);
        })
    }

    DeleteForever() {
        this.DataService.deleteForever(this.$scope.home.userName, this.selectedUser).then(() => {
            this.fireMessages = _.without(this.fireMessages, _.findWhere(this.fireMessages, {isTrash: true, userName: this.selectedUser}));
        })
    }

    Send() {
        this.DataService.sendReply(this.$scope.home.userName, this.selectedUser, this.reply.body).then(() => {
            this.fireMessages.push({amISender: true, body: this.reply.body, sent: Date.now(), isTrash: false, userName: this.selectedUser});
            this.reply.body = "";
        })
    }

    SendNewMessage(to:string, body:string) {
        this.DataService.sendReply(this.$scope.home.userName, to, body).then(() => {
            this.fireMessages.push({amISender: true, body: body, sent: Date.now(), isTrash: false, userName: this.$scope.home.FireProcess(to)});
            this.$state.go('^');
            this.ShowSuccess('Your message has been sent!!');
//            this.reply.body = "";
        })
    }

    SetSelectedUser(arrIndex:number) {
        this.selectedUserIndex = arrIndex;
        console.log(arrIndex);

        var userNames:string[] = _.map(_.uniq(_.pluck(_.filter(this.fireMessages, (note:INote)=> {
            return note.isTrash === this.isTrash;
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