var HomeCtrl = (function () {
    function HomeCtrl($scope, $firebase, $firebaseSimpleLogin, $state, toastr, DataService) {
        var _this = this;
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.home = this;
        this.IsSearchHidden = true;

        this.email = "breeder1@gmail.com";
        this.pass = "123456";

        var fref = new Firebase("https://torid-fire-6526.firebaseio.com/");
        $scope.auth = $firebaseSimpleLogin(fref);
        $scope.authAction = new FirebaseSimpleLogin(fref, function (error, user) {
            if (error) {
                _this.ShowError(error.toString());
            } else if (user) {
                _this.$state.go('home');
            } else {
            }
        });
    }
    HomeCtrl.prototype.Signin = function (email, pass) {
        this.$scope.authAction.login('password', {
            email: email,
            password: pass
        });
    };

    HomeCtrl.prototype.Logout = function () {
        this.$scope.authAction.logout();

        this.ShowSuccess('You were successfully logged out');
    };

    HomeCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    HomeCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return HomeCtrl;
})();
