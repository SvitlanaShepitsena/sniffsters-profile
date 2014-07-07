var LoginCtrl = (function () {
    function LoginCtrl($scope, $state, toastr, DataService) {
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.login = this;
    }
    LoginCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    LoginCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return LoginCtrl;
})();
