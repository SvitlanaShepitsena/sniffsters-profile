/// <reference path="HomeCtrl.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularfire/angularfire.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />
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
            _this.corrUsers = _.map(_.keys(inbox), function (userFire) {
                return userFire.toString().replace(/\(p\)/g, '.');
            });
            _this.selectedUser = _this.corrUsers[0];
        });
    }
    MessagesCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    MessagesCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return MessagesCtrl;
})();
