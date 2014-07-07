var MessagesCtrl = (function () {
    function MessagesCtrl($scope, $modal, $state, toastr, DataService) {
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.messages = this;

        $scope.userMessages = [];
        $scope.userMessagesTrash = [];
        $scope.spinner = false;

        $scope.loggedUser = loggedUser.getName();

        $scope.selectedUserMessages = null;
        $scope.selectedUserMessagesTrash = null;

        $scope.userReply = {};
        $scope.userReply.reply = '';

        $scope.userDoesNotExist = false;

        $scope.init = function () {
            $scope.spinner = true;
            dataService.get('/Messages/GetUserMessages').then(function (userMessages) {
                $scope.userMessages = userMessages;

                if ($scope.userMessages.length > 0) {
                    var firstUserMessages = $scope.userMessages[0];
                    $scope.setSelectedUser(firstUserMessages);
                }
            }).then(function () {
                $scope.spinner = false;
            });
        };

        $scope.getClass = function (path) {
            if ($location.path() === path) {
                return ('active');
            }
            return '';
        };
        $scope.setSelectedUser = function (userMessages) {
            $scope.userReply.reply = '';
            $scope.selectedUserMessages = userMessages;

            if ($scope.selectedUserMessages != null) {
                dataService.setMessagesRead('/Messages/SetMessagesRead', userMessages.UserName).then(function () {
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

        $scope.setSelectedUserTrash = function (userMessages) {
            $scope.selectedUserMessagesTrash = userMessages;
        };

        $scope.isActive = function (userMessages) {
            var comparison = $scope.selectedUserMessages === userMessages;
            return comparison;
        };
        $scope.isCurrentPage = function (currentPage) {
            return $scope.currentPage === currentPage;
        };
        $scope.isActiveTrash = function (userMessages) {
            return $scope.selectedUserMessagesTrash === userMessages;
        };

        $scope.saveReply = function () {
            var message = new Message($scope.selectedUserMessages.UserName, $scope.userReply.reply);
            var postMessageUrl = '/Messages/Create';

            dataService.postMessage(postMessageUrl, message).then(function (savedMessage) {
                $scope.selectedUserMessages.Messages.push(savedMessage);

                $scope.userReply.reply = '';
                messagesHub.server.mailNote(savedMessage);
            });
        };

        $scope.trashConversation = function () {
            var corrUser = $scope.selectedUserMessages.UserName;
            var url = '/Messages/ConversationTrash';
            dataService.conversationTrash(url, corrUser).then(function () {
                var indexToDelete = $scope.getSelectedUserIndex($scope.userMessages, corrUser);

                var deletedUserMessages = $scope.userMessages.splice(indexToDelete, 1)[0];
                $scope.userMessagesTrash.push(deletedUserMessages);

                if ($scope.userMessages.length > 0) {
                    $scope.setSelectedUser($scope.userMessages[0]);
                } else {
                    $scope.setSelectedUser(null);
                }
            });
        };

        $scope.recoverConversation = function () {
            var corrUserTrash = $scope.selectedUserMessagesTrash.UserName;
            var url = '/Messages/ConversationRecover';
            dataService.conversationRecover(url, corrUserTrash).then(function () {
                var indexToDelete = $scope.getSelectedUserIndex($scope.userMessagesTrash, corrUserTrash);

                var deletedUserMessagesTrash = $scope.userMessagesTrash.splice(indexToDelete, 1)[0];

                $scope.userMessages.push(deletedUserMessagesTrash);
                if ($scope.selectedUserMessages == null) {
                    $scope.setSelectedUser($scope.userMessages[0]);
                }
                if ($scope.userMessagesTrash.length > 0) {
                    $scope.setSelectedUserTrash($scope.userMessagesTrash[0]);
                } else {
                    $scope.setSelectedUserTrash(null);
                }
            });
        };

        $scope.deleteForeverConversation = function () {
            var corrUserDelete = $scope.selectedUserMessagesTrash.UserName;
            var url = '/Messages/DeleteConversation';

            var modalInstance = $modal.open({
                templateUrl: '/Content/Messages/Templates/directives/deleteModal',
                controller: function ($scope, $modalInstance) {
                    $scope.ok = function () {
                        $modalInstance.close("ok");
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }
            });

            modalInstance.result.then(function () {
                dataService.conversationDelete(url, corrUserDelete).then(function () {
                    var indexToDelete = $scope.getSelectedUserIndex($scope.userMessagesTrash, corrUserDelete);

                    $scope.userMessagesTrash.splice(indexToDelete, 1)[0];

                    if ($scope.userMessagesTrash.length > 0) {
                        $scope.setSelectedUserTrash($scope.userMessagesTrash[0]);
                    } else {
                        $scope.setSelectedUserTrash(null);
                    }
                });
            });
        };

        messagesHub.client.checkMail = function (message) {
            if ($scope.loggedUser === message.Receiver) {
                var isInCorrUserList = false;

                for (var i = 0; i < $scope.userMessages.length; i++) {
                    var userMessage = $scope.userMessages[i];

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

                $scope.$apply();

                toastr.success('You got a mail!');
            }
        };

        $scope.getSelectedUserIndex = function (userMessages, userName) {
            for (var i = 0; i < userMessages.length; i++) {
                var userNameArray = userMessages[i].UserName;
                if (userNameArray === userName) {
                    return i;
                }
            }
        };

        $scope.init();
    }

    MessagesCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    MessagesCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return MessagesCtrl;
})();
