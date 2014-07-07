/// <reference path="IndexCtrl.ts" />


interface IMessagesScope extends IMainScope {
    messages:MessagesCtrl;
    ctrl:IndexCtrl;

}
class MessagesCtrl {

    constructor(public $scope, $modal, $location, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.messages = this;
        DataService.getMessages("breeder1@gmail(p)com");

//        /* =============== Scope Settiddngs =============== Creating variable stubs*/
        $scope.userMessages = [];
        $scope.userMessagesTrash = [];
        $scope.spinner = false;

        /*Used in amI filter*/
        $scope.loggedUser = $scope.index.userName;

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
            DataService.getMessages("").then((userMessages) => {
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

//            if ($scope.selectedUserMessages != null) {
//                dataService.setMessagesRead('/Messages/SetMessagesRead', userMessages.UserName).then(() => {
//                    var messages = userMessages.Messages;
//
//                    for (var i = 0; i < messages.length; i++) {
//                        var message = messages[i];
//                        if (message.Receiver === $scope.loggedUser) {
//                            message.Unread = false;
//                        }
//                    }
//                });
//            }
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

//        $scope.saveReply = () => {
//            /*Create a message object and provide correspondence userName & message body*/
//            var message = new Message($scope.selectedUserMessages.UserName, $scope.userReply.reply);
//            var postMessageUrl = '/Messages/Create';
//
//            dataService.postMessage(postMessageUrl, message).then((savedMessage) => {
//                //                        savedMessage.Unread = false;
//                // Adding newly created message to array of Messages of selected user in order to see this message in UI.
//                $scope.selectedUserMessages.Messages.push(savedMessage);
//                // Set a reply textarea to empty
//                $scope.userReply.reply = '';
//                messagesHub.server.mailNote(savedMessage);
//            });
//        };

//        $scope.trashConversation = () => {
//            var corrUser = $scope.selectedUserMessages.UserName;
//            var url = '/Messages/ConversationTrash';
//            dataService.conversationTrash(url, corrUser).then(() => {
//                var indexToDelete = $scope.getSelectedUserIndex($scope.userMessages, corrUser);
//
//                var deletedUserMessages = $scope.userMessages.splice(indexToDelete, 1)[0];
//                $scope.userMessagesTrash.push(deletedUserMessages);
//
//                if ($scope.userMessages.length > 0) {
//                    $scope.setSelectedUser($scope.userMessages[0]);
//                }
//                else {
//                    $scope.setSelectedUser(null);
//                }
//            });
//        };
//
//        $scope.recoverConversation = () => {
//            var corrUserTrash = $scope.selectedUserMessagesTrash.UserName;
//            var url = '/Messages/ConversationRecover';
//            dataService.conversationRecover(url, corrUserTrash).then(() => {
//                var indexToDelete = $scope.getSelectedUserIndex($scope.userMessagesTrash, corrUserTrash);
//
//                var deletedUserMessagesTrash = $scope.userMessagesTrash.splice(indexToDelete, 1)[0];
//
//                $scope.userMessages.push(deletedUserMessagesTrash);
//                if ($scope.selectedUserMessages == null) {
//                    $scope.setSelectedUser($scope.userMessages[0]);
//                }
//                if ($scope.userMessagesTrash.length > 0) {
//                    $scope.setSelectedUserTrash($scope.userMessagesTrash[0]);
//                }
//                else {
//                    $scope.setSelectedUserTrash(null);
//                }
//            });
//        };

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
//
//            modalInstance.result.then(() => {
//                dataService.conversationDelete(url, corrUserDelete).then(() => {
//                    var indexToDelete = $scope.getSelectedUserIndex($scope.userMessagesTrash, corrUserDelete);
//
//                    $scope.userMessagesTrash.splice(indexToDelete, 1)[0];
//
//                    if ($scope.userMessagesTrash.length > 0) {
//                        $scope.setSelectedUserTrash($scope.userMessagesTrash[0]);
//                    }
//                    else {
//                        $scope.setSelectedUserTrash(null);
//                    }
//                });
//            });


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