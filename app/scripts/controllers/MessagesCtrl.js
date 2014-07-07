var MessagesCtrl = (function () {
    function MessagesCtrl($scope, $modal, $location, $state, toastr, DataService) {
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.messages = this;
        DataService.getMessages("breeder1@gmail(p)com");

        $scope.userMessages = [];
        $scope.userMessagesTrash = [];
        $scope.spinner = false;

        $scope.loggedUser = $scope.index.userName;

        $scope.selectedUserMessages = null;
        $scope.selectedUserMessagesTrash = null;

        $scope.userReply = {};
        $scope.userReply.reply = '';

        $scope.userDoesNotExist = false;

        $scope.init = function () {
            $scope.spinner = true;
            DataService.getMessages("").then(function (userMessages) {
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
