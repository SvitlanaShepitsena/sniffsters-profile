/// <reference path="HomeCtrl.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularfire/angularfire.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />

interface IMessagesScope extends IHomeScope {
    messages:MessagesCtrl;
    home:HomeCtrl;
}
class MessagesCtrl {

    fireMessages;
    messagesRef;
    reply:{
        body:string
    }
    isTrash:boolean;
    selectedUser:any;

    selectedUserIndex:number;
    selectedUserMessages:INote[];

    constructor(public $scope, public FinduserService, public $firebase, public settings, public $filter, $firebaseSimpleLogin, $modal, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.noMessages = settings.noMessages;
        $scope.noSuchUser = false;

        $scope.messages = this;
        $scope.reply = {};
        $scope.home.hideMenu = true;

        $scope.home.auth.$getCurrentUser().then((user) => {
//            FROM
            $scope.home.Breedership($scope.home.FireProcess(user.email)).then(() => {
                var messagesUrl = $scope.home.MainUrl;
                var type;
                if ($scope.home.isBreeder === true) {
                    type = "breeders/";
                }
                if ($scope.home.isBreeder === false) {
                    type = "lookers/";
                }
                messagesUrl = messagesUrl + type + $scope.home.FireProcess($scope.home.userName) + '/messages';
                this.messagesRef = $firebase(new Firebase(messagesUrl));
                this.fireMessages = (this.messagesRef)
                this.SetSelectedUser(0);


            })
        })
    }

    Delete() {
        this.DataService.deleteConversation(this.$scope.home.userName, this.selectedUser.userName, this.$scope.home.isBreeder).then(() => {
            _.where(this.fireMessages, {isTrash: false, userName: this.selectedUser.userName})
                .forEach((message:INote)=> {
                    message.isTrash = true;
                })
            this.SetSelectedUser(0);
        })
    }

    Recover() {
        this.DataService.recoverConversation(this.$scope.home.userName, this.selectedUser.userName, this.$scope.home.isBreeder).then(() => {
            _.where(this.fireMessages, {isTrash: true, userName: this.selectedUser.userName})
                .forEach((message:INote)=> {
                    message.isTrash = false;
                })
            this.SetSelectedUser(0);

        })
    }

    DeleteForever() {
        this.DataService.deleteForever(this.$scope.home.userName, this.selectedUser.userName, this.$scope.home.isBreeder).then(() => {
            this.fireMessages = _.without(this.fireMessages,
                _.findWhere(this.fireMessages, {isTrash: true, userName: this.selectedUser.userName}));
            this.SetSelectedUser(0);
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

    SendNewMessage(to:string, body:string, levelUp:boolean) {
        this.$scope.home.auth.$getCurrentUser().then((user) => {
            this.$scope.home.Breedership(this.$scope.home.FireProcess(user.email)).then(() => {
                this.FinduserService.find(to).then((userToProfile)=> {
                        // UserTo is in DB

//                        FROM ##############################
                        if (this.$scope.home.isBreeder === true) {
                            this.DataService.sendReply(this.$scope.home.userName, userToProfile.Email, userToProfile.UserName, body, true).then(() => {
//                                this.fireMessages.push({amISender: true, body: body, sent: Date.now(), isTrash: false, nickName: this.$scope.home.FireProcess(to), userName: this.$scope.home.FireProcess(userToProfile.Email)});
//                                this.$state.go('^');
//                                this.ShowSuccess('Your message has been sent!!');
                            })
                        }
                        if (this.$scope.home.isBreeder === false) {
                            this.DataService.sendLookerReply(this.$scope.home.userName, userToProfile.Email, userToProfile.UserName, body, true).then(() => {
//                                this.fireMessages.push({amISender: true, body: body, sent: Date.now(), isTrash: false, nickName: this.$scope.home.FireProcess(to), userName: this.$scope.home.FireProcess(userToProfile.Email)});
//                                this.$state.go('^');
//                                this.ShowSuccess('Your message has been sent!!');
                            })
                        }
//                TO #################################

                        if (userToProfile.isBreeder === true) {
                            this.DataService.sendReply(userToProfile.Email, this.$scope.home.userName, this.$scope.home.nickName, body, false).then(() => {
                                this.SetSelectedUser(0);
                                if (levelUp) {
                                    this.$state.go('^');
                                }
                                this.$scope.reply.body = "";

                                this.ShowSuccess(this.settings.messageSuccessNotice);
                            })
                        }
                        if (userToProfile.isBreeder === false) {
                            this.DataService.sendLookerReply(userToProfile.Email, this.$scope.home.userName, this.$scope.home.nickName, body, false).then(() => {

                                this.SetSelectedUser(0);
                                if (levelUp) {
                                    this.$state.go('^');
                                }

                                //this.$scope.note.body = "";
                                //this.$scope.note.to = "";
                                //this.$scope.reply.body = "";

                                this.ShowSuccess(this.settings.messageSuccessNotice);
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

        var notes = this.fireMessages;

        notes = _.sortBy(notes, (note:INote)=> {
            if (!!note) {
                return -note.sent;
            }
        });

        var userNames = _.map(_.uniq(_.filter(notes, (note:INote)=> {

            if (_.isNull(note)) {
                return;
            }
            return note.isTrash === this.isTrash;
        })), (message)=> {
            return {userName: message.userName, nickName: message.nickName};
        });
        userNames = _.uniq(userNames, false, (user) => {
            return user.userName;
        })

        this.selectedUser = userNames[this.selectedUserIndex];
        if (!_.isUndefined(this.fireMessages) && !_.isUndefined(this.selectedUser)) {

            this.messagesRef.$getIndex().forEach((key)=> {
                var message = this.messagesRef[key];

                if (message.nickName == this.selectedUser.nickName) {
                    message.isUnread = false;
                }
            })
            this.messagesRef.$save();

        }
    }


    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}