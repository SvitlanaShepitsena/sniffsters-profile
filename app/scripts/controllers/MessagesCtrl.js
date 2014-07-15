/// <reference path="HomeCtrl.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularfire/angularfire.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />
var MessagesCtrl = (function () {
    function MessagesCtrl($scope, $filter, $firebaseSimpleLogin, $modal, $state, toastr, DataService) {
        var _this = this;
        this.$scope = $scope;
        this.$filter = $filter;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.messages = this;

        $scope.home.hideMenu = true;

        $scope.home.auth.$getCurrentUser().then(function (user) {
            if ($scope.home.isBreeder) {
                DataService.getMessages(user.email).then(function (messages) {
                    _this.fireMessages = messages;
                    _this.SetSelectedUser(0);
                });
            } else {
                DataService.getLookerMessages(user.email).then(function (messages) {
                    _this.fireMessages = messages;
                    _this.SetSelectedUser(0);
                });
            }
        });
    }
    MessagesCtrl.prototype.Delete = function () {
        var _this = this;
        this.DataService.deleteConversation(this.$scope.home.userName, this.selectedUser).then(function () {
            _.where(_this.fireMessages, { isTrash: false, userName: _this.selectedUser }).forEach(function (message) {
                message.isTrash = true;
            });
        });
    };

    MessagesCtrl.prototype.Recover = function () {
        var _this = this;
        this.DataService.recoverConversation(this.$scope.home.userName, this.selectedUser).then(function () {
            _.where(_this.fireMessages, { isTrash: true, userName: _this.selectedUser }).forEach(function (message) {
                message.isTrash = false;
            });
            //            this.SetSelectedUser(0);
        });
    };

    MessagesCtrl.prototype.DeleteForever = function () {
        var _this = this;
        this.DataService.deleteForever(this.$scope.home.userName, this.selectedUser).then(function () {
            _this.fireMessages = _.without(_this.fireMessages, _.findWhere(_this.fireMessages, { isTrash: true, userName: _this.selectedUser }));
        });
    };

    MessagesCtrl.prototype.Send = function () {
        var _this = this;
        if (this.$scope.home.isBreeder) {
            this.DataService.sendReply(this.$scope.home.userName, this.selectedUser, this.reply.body).then(function () {
                _this.fireMessages.push({ amISender: true, body: _this.reply.body, sent: Date.now(), isTrash: false, userName: _this.selectedUser });
                _this.reply.body = "";
            });
        } else {
            this.DataService.sendLookerReply(this.$scope.home.userName, this.selectedUser, this.reply.body).then(function () {
                _this.fireMessages.push({ amISender: true, body: _this.reply.body, sent: Date.now(), isTrash: false, userName: _this.selectedUser });
                _this.reply.body = "";
            });
        }
    };

    MessagesCtrl.prototype.SendNewMessage = function (to, body) {
        var _this = this;
        if (this.$scope.home.isBreeder) {
            this.DataService.sendReply(this.$scope.home.userName, to, body).then(function () {
                _this.fireMessages.push({ amISender: true, body: body, sent: Date.now(), isTrash: false, userName: _this.$scope.home.FireProcess(to) });
                _this.$state.go('^');
                _this.ShowSuccess('Your message has been sent!!');
                //            this.reply.body = "";
            });
        } else {
            this.DataService.sendLookerReply(this.$scope.home.userName, to, body).then(function () {
                _this.fireMessages.push({ amISender: true, body: body, sent: Date.now(), isTrash: false, userName: _this.$scope.home.FireProcess(to) });
                _this.$state.go('^');
                _this.ShowSuccess('Your message has been sent!!');
                //            this.reply.body = "";
            });
        }
    };

    MessagesCtrl.prototype.SetSelectedUser = function (arrIndex) {
        var _this = this;
        this.selectedUserIndex = arrIndex;

        var userNames = _.map(_.uniq(_.pluck(_.filter(this.fireMessages, function (note) {
            return note.isTrash === _this.isTrash;
        }), "userName")), function (userName) {
            return userName;
        });
        this.selectedUser = userNames[this.selectedUserIndex];
    };

    MessagesCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    MessagesCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return MessagesCtrl;
})();
