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
    selectedUser:any;

    selectedUserIndex:number;
    selectedUserMessages:INote[];

    constructor(public $scope, public FinduserService, public settings, public $filter, $firebaseSimpleLogin, $modal, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.noMessages = settings.noMessages;
        $scope.noSuchUser = false;

        $scope.messages = this;

        $scope.home.hideMenu = true;

        $scope.home.auth.$getCurrentUser().then((user) => {
//            FROM
            $scope.home.Breedership($scope.home.FireProcess(user.email)).then(() => {
                if ($scope.home.isBreeder === true) {
                    DataService.getMessages(user.email).then((messages:any)=> {
                        this.fireMessages = messages;
                        this.SetSelectedUser(0);
                        var userNames = _.pluck(this.fireMessages, 'userName');
                        userNames.forEach((username)=> {

                        })
                    })
                }
                if ($scope.home.isBreeder === false) {
                    DataService.getLookerMessages(user.email).then((messages:any)=> {
                        this.fireMessages = messages;
                        this.SetSelectedUser(0);
                    })
                }

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

//    Send() {
//        this.$scope.home.auth.$getCurrentUser().then((user) => {
//            this.$scope.home.Breedership(this.$scope.home.FireProcess(user.email)).then(() => {
//                if (this.$scope.home.isBreeder === true) {
//                    this.DataService.sendReply(this.$scope.home.userName, this.selectedUser.userName,this.selectedUser.nickName, this.reply.body).then(() => {
//                        this.fireMessages.push({amISender: true, body: this.reply.body, sent: Date.now(), isTrash: false, userName: this.selectedUser.userName, nickName:this.selectedUser.nickName});
//                        this.reply.body = "";
//                    })
//                }
//                if (this.$scope.home.isBreeder === false) {
//                    this.DataService.sendLookerReply(this.$scope.home.userName, this.selectedUser.userName,this.selectedUser.nickName, this.reply.body).then(() => {
//                        this.fireMessages.push({amISender: true, body: this.reply.body, sent: Date.now(), isTrash: false, userName: this.selectedUser.userName, nickName:this.selectedUser.nickName});
//                        this.reply.body = "";
//                    })
//                }
//            })
//        })
//    }

    SendNewMessage(to:string, body:string) {
        this.$scope.home.auth.$getCurrentUser().then((user) => {
            this.$scope.home.Breedership(this.$scope.home.FireProcess(user.email)).then(() => {
                this.FinduserService.find(to).then((userToProfile)=> {
                        // UserTo is in DB

//                        FROM ##############################
                        if (this.$scope.home.isBreeder === true) {
                            this.DataService.sendReply(this.$scope.home.userName, userToProfile.Email, userToProfile.UserName, body).then(() => {
                                this.fireMessages.push({amISender: true, body: body, sent: Date.now(), isTrash: false, nickName: this.$scope.home.FireProcess(to), userName: this.$scope.home.FireProcess(userToProfile.Email)});
//                                this.$state.go('^');
//                                this.ShowSuccess('Your message has been sent!!');
                            })
                        }
                        if (this.$scope.home.isBreeder === false) {
                            this.DataService.sendLookerReply(this.$scope.home.userName, userToProfile.Email, userToProfile.UserName, body).then(() => {
                                this.fireMessages.push({amISender: true, body: body, sent: Date.now(), isTrash: false, nickName: this.$scope.home.FireProcess(to), userName: this.$scope.home.FireProcess(userToProfile.Email)});
//                                this.$state.go('^');
//                                this.ShowSuccess('Your message has been sent!!');
                            })
                        }
//                TO #################################

                        if (userToProfile.isBreeder === true) {
                            this.DataService.sendReply(userToProfile.Email, this.$scope.home.userName, this.$scope.home.nickName, body).then(() => {
//                                this.$state.go('^');
                                this.ShowSuccess('Your message has been sent!!');
                            })
                        }
                        if (this.$scope.home.isBreeder === false) {
                            this.DataService.sendLookerReply(userToProfile.Email, this.$scope.home.userName, this.$scope.home.nickName, body).then(() => {
//                                this.$state.go('^');
                                this.ShowSuccess('Your message has been sent!!');
                            })
                        }

                    },
                    () => {
                        // Not Found
                        this.ShowError(this.settings.noSuchUser);
                        this.$scope.noSuchUser = true;
                    }
                );


            })
        })
    }

    SetSelectedUser(arrIndex:number) {
        this.selectedUserIndex = arrIndex;

        var userNames = _.map(_.uniq(_.filter(this.fireMessages, (note:INote)=> {
            return note.isTrash === this.isTrash;
        })), (message)=> {
            return {userName: message.userName, nickName: message.nickName};
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