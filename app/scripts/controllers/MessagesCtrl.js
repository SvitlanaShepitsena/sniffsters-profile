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

        var fref = new Firebase("https://torid-fire-6526.firebaseio.com/");
        $scope.auth = $firebaseSimpleLogin(fref);
        $scope.authAction = new FirebaseSimpleLogin(fref, function (error, user) {
            if (error) {
                // an error occurred while attempting login
                _this.ShowError(error.toString());
            } else if (user) {
                DataService.getMessages($scope.home.IdFire).then(function (messages) {
                    _this.fireMessages = messages;
                    _this.SetSelectedUser(0);
                });
            } else {
            }
        });
    }
    MessagesCtrl.prototype.Delete = function () {
        var _this = this;
        this.DataService.deleteConversation(this.$scope.home.FireUname, this.selectedUser).then(function () {
            _this.fireMessages = _.without(_this.fireMessages, _.findWhere(_this.fireMessages, { isTrash: false, userName: _this.selectedUser }));
            _this.SetSelectedUser(0);
        });
    };

    MessagesCtrl.prototype.DeleteForever = function () {
        var _this = this;
        this.DataService.deleteForever(this.$scope.home.FireUname, this.selectedUser).then(function () {
            _this.fireMessages = _.without(_this.fireMessages, _.findWhere(_this.fireMessages, { isTrash: false, userName: _this.selectedUser }));
            _this.SetSelectedUser(0);
        });
    };

    MessagesCtrl.prototype.Send = function () {
        var _this = this;
        this.DataService.sendReply(this.$scope.home.FireUname, this.selectedUser, this.reply.body).then(function () {
            _this.fireMessages.push({ amISender: true, body: _this.reply.body, sent: Date.now(), isTrash: false, userName: _this.selectedUser });
            _this.reply.body = "";
        });
    };

    MessagesCtrl.prototype.SetSelectedUser = function (arrIndex) {
        var _this = this;
        this.selectedUserIndex = arrIndex;

        var userNames = _.map(_.uniq(_.pluck(_.filter(this.fireMessages, function (note) {
            return note.isTrash === _this.isTrash;
        }), "userName")), function (userName) {
            return userName;
        });
        console.log(userNames);
        console.log(this.isTrash);

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
