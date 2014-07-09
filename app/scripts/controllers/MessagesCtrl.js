var MessagesCtrl = (function () {
    function MessagesCtrl($scope, $modal, $state, toastr, DataService) {
        var _this = this;
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.messages = this;

        DataService.getMessages($scope.home.IdFire).then(function (messages) {
            _this.fireMessages = messages;

            var inbox = messages.Inbox;
            _this.corrUsersFire = _.keys(inbox);

            _this.corrUsers = _.map(_this.corrUsersFire, function (userFire) {
                return userFire.toString().replace(/\(p\)/g, '.');
            });

            if (_this.selectedUser == null) {
                _this.selectedUserIndex = 0;
                _this.SetSelectedUser(_this.selectedUserIndex);
            }
        });
    }
    MessagesCtrl.prototype.SetSelectedUser = function (arrIndex) {
        this.selectedUserIndex = arrIndex;
        console.log(arrIndex);

        this.selectedUserFire = this.corrUsersFire[this.selectedUserIndex];
        this.selectedUser = this.corrUsers[this.selectedUserIndex];

        this.selectedUserMessages = _(this.fireMessages.Inbox[this.selectedUserFire]).values();
    };

    MessagesCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    MessagesCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return MessagesCtrl;
})();
