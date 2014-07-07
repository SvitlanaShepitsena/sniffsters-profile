/// <reference path="IndexCtrl.ts" />


interface IMessagesScope extends IMainScope {
    messages:MessagesCtrl;
    ctrl:IndexCtrl;

}
class MessagesCtrl {

    constructor(public $scope:IMessagesScope, $modal, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.messages = this;


        /* =============== Scope Settings =============== Creating variable stubs*/
        $scope.userMessages = [];
        $scope.userMessagesTrash = [];
        $scope.spinner = false;

        /*Used in amI filter*/
        $scope.loggedUser = loggedUser.getName();

        // Register variables to set messages for one selected user, which will be set later on
        $scope.selectedUserMessages = null;
        $scope.selectedUserMessagesTrash = null;

        // create a userReply object and set its property to textarea text typed by user. Defined on ng-model="userReply.reply" in replyDeleteButtons
        $scope.userReply = {};
        $scope.userReply.reply = '';

        $scope.userDoesNotExist = false;


        /* =============== Functions ===============*/

        $scope.init = () => {
// run get method from our service and get promise immediately.
            // when the promise is resolved userMessages will be filled with real data.
            $scope.spinner = true;
            dataService.get('/Messages/GetUserMessages').then((userMessages) => {
                //                     filled userMessages array with data returned from Dataservice
                $scope.userMessages = userMessages;
                // get first userMessages from userMessages array
                if ($scope.userMessages.length > 0) {
                    var firstUserMessages = $scope.userMessages[0];
                    $scope.setSelectedUser(firstUserMessages);
                }
            }).then(() => {
                $scope.spinner = false;
            });
        };

        $scope.getClass = (path) => {
            if ($location.path() === path) {
                return ('active');
            }
            return '';
        };
        $scope.setSelectedUser = (userMessages) => {
            $scope.userReply.reply = '';
            $scope.selectedUserMessages = userMessages;

            if ($scope.selectedUserMessages != null) {
                dataService.setMessagesRead('/Messages/SetMessagesRead', userMessages.UserName).then(() => {
                    var messages = userMessages.Messages;

                    for (var i = 0; i < messages.length; i++) {
                        var message = messages[i];
                        if (message.Receiver === $scope.loggedUser) {
                            message.Unread = false;
                        }
                    }
                });
            }
        };
        // method for selected user on Trash
        $scope.setSelectedUserTrash = (userMessages) => {
            $scope.selectedUserMessagesTrash = userMessages;
        };

        $scope.isActive = (userMessages) => {
            var comparison:boolean = $scope.selectedUserMessages === userMessages;
            return comparison;
        };
        $scope.isCurrentPage = (currentPage) => {
            return $scope.currentPage === currentPage;
        };
        $scope.isActiveTrash = (userMessages) => {
            return $scope.selectedUserMessagesTrash === userMessages;
        };

        $scope.saveReply = () => {
            /*Create a message object and provide correspondence userName & message body*/
            var message = new Message($scope.selectedUserMessages.UserName, $scope.userReply.reply);
            var postMessageUrl = '/Messages/Create';

            dataService.postMessage(postMessageUrl, message).then((savedMessage) => {
                //                        savedMessage.Unread = false;
                // Adding newly created message to array of Messages of selected user in order to see this message in UI.
                $scope.selectedUserMessages.Messages.push(savedMessage);
                // Set a reply textarea to empty
                $scope.userReply.reply = '';
                messagesHub.server.mailNote(savedMessage);
            });
        };

        $scope.trashConversation = () => {
            var corrUser = $scope.selectedUserMessages.UserName;
            var url = '/Messages/ConversationTrash';
            dataService.conversationTrash(url, corrUser).then(() => {
                var indexToDelete = $scope.getSelectedUserIndex($scope.userMessages, corrUser);

                var deletedUserMessages = $scope.userMessages.splice(indexToDelete, 1)[0];
                $scope.userMessagesTrash.push(deletedUserMessages);

                if ($scope.userMessages.length > 0) {
                    $scope.setSelectedUser($scope.userMessages[0]);
                }
                else {
                    $scope.setSelectedUser(null);
                }
            });
        };

        $scope.recoverConversation = () => {
            var corrUserTrash = $scope.selectedUserMessagesTrash.UserName;
            var url = '/Messages/ConversationRecover';
            dataService.conversationRecover(url, corrUserTrash).then(() => {
                var indexToDelete = $scope.getSelectedUserIndex($scope.userMessagesTrash, corrUserTrash);

                var deletedUserMessagesTrash = $scope.userMessagesTrash.splice(indexToDelete, 1)[0];

                $scope.userMessages.push(deletedUserMessagesTrash);
                if ($scope.selectedUserMessages == null) {
                    $scope.setSelectedUser($scope.userMessages[0]);
                }
                if ($scope.userMessagesTrash.length > 0) {
                    $scope.setSelectedUserTrash($scope.userMessagesTrash[0]);
                }
                else {
                    $scope.setSelectedUserTrash(null);
                }
            });
        };

        $scope.deleteForeverConversation = () => {
            var corrUserDelete = $scope.selectedUserMessagesTrash.UserName;
            var url = '/Messages/DeleteConversation';

            var modalInstance = $modal.open({
                templateUrl: '/Content/Messages/Templates/directives/deleteModal',
                controller: ($scope, $modalInstance) => {
                    $scope.ok = () => {
                        $modalInstance.close("ok");
                    };

                    $scope.cancel = () => {
                        $modalInstance.dismiss('cancel');
                    };
                }
            });

            modalInstance.result.then(() => {
                dataService.conversationDelete(url, corrUserDelete).then(() => {
                    var indexToDelete = $scope.getSelectedUserIndex($scope.userMessagesTrash, corrUserDelete);

                    $scope.userMessagesTrash.splice(indexToDelete, 1)[0];

                    if ($scope.userMessagesTrash.length > 0) {
                        $scope.setSelectedUserTrash($scope.userMessagesTrash[0]);
                    }
                    else {
                        $scope.setSelectedUserTrash(null);
                    }
                });
            });


        };


        messagesHub.client.checkMail = (message) => {
            if ($scope.loggedUser === message.Receiver) {
                var isInCorrUserList:boolean = false;

                for (var i = 0; i < $scope.userMessages.length; i++) {
                    var userMessage = $scope.userMessages[i];
                    // If the sender of a new message is already in our CorrUser Panel. Add message to
                    // his Messages array
                    if (userMessage.UserName === message.Sender) {
                        userMessage.Messages.push(message);
                        isInCorrUserList = true;

                        if ($scope.selectedUserMessages.UserName === message.Sender) {
                            $scope.setSelectedUser($scope.selectedUserMessages);
                        }
                    }
                }

                if (!isInCorrUserList) {
                    var newUserMessages = {
                        UserName: message.Sender,
                        LastMessage: message.SentDateTime,
                        Messages: new Array(message)
                    };
                    $scope.userMessages.push(newUserMessages);
                }
                // Notify ANgular that scope data has been changed and he needs to update view.
                // This method should be executed when data is changed not on scope.
                $scope.$apply();
                // Send notification with toastr service registered in app.
                toastr.success('You got a mail!');
            }
        };

        $scope.getSelectedUserIndex = (userMessages, userName:string) => {
            for (var i = 0; i < userMessages.length; i++) {
                var userNameArray = userMessages[i].UserName;
                if (userNameArray === userName) {
                    return i;
                }
            }
        };

        /* =============== Run Functions ===============*/

        $scope.init();


    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}