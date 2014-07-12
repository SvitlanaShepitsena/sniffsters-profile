/// <reference path="HomeCtrl.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularfire/angularfire.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />
var MessagesCtrl = (function () {
    function MessagesCtrl($scope, $firebaseSimpleLogin, $modal, $state, toastr, DataService) {
        var _this = this;
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.messages = this;

        $scope.home.hideMenu = true;

        var fref = new Firebase("https://torid-fire-6526.firebaseio.com/");
        $scope.auth = $firebaseSimpleLogin(fref);
        $scope.authAction = new FirebaseSimpleLogin(fref, function (error, user) {
            if (error) {
                // an error occurred while attempting login
                _this.ShowError(error.toString());
            } else if (user) {
                DataService.getMessages($scope.home.IdFire, true).then(function (messages) {
                    _this.fireMessages = messages;

                    _this.corrUsersFire = _.keys(messages);
                    _this.corrUsers = _.map(_this.corrUsersFire, function (userFire) {
                        return userFire.toString().replace(/\(p\)/g, '.');
                    });

                    if (_this.selectedUser == null) {
                        _this.selectedUserIndex = 0;
                        _this.SetSelectedUser(_this.selectedUserIndex);
                    }
                });
                //
            } else {
            }
        });
    }
    MessagesCtrl.prototype.Delete = function () {
        var _this = this;
        this.DataService.deleteConversation(this.$scope.home.FireUname, this.selectedUserFire).then(function () {
            _this.corrUsers.splice(_this.selectedUserIndex, 1);
            _this.corrUsersFire.splice(_this.selectedUserIndex, 1);
            _this.SetSelectedUser(0);
        });
    };

    MessagesCtrl.prototype.Send = function () {
        var _this = this;
        this.DataService.sendReply(this.$scope.home.FireUname, this.selectedUserFire, this.reply.body).then(function () {
            _this.selectedUserMessages.push({ amISender: true, body: _this.reply.body, sent: Date.now().toString() });
            _this.reply.body = "";
        });
    };

    MessagesCtrl.prototype.SetSelectedUser = function (arrIndex) {
        this.selectedUserIndex = arrIndex;

        this.selectedUserFire = this.corrUsersFire[this.selectedUserIndex];
        this.selectedUser = this.corrUsers[this.selectedUserIndex];

        this.selectedUserMessages = _(this.fireMessages.inbox[this.selectedUserFire]).values();
    };

    MessagesCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    MessagesCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return MessagesCtrl;
})();
