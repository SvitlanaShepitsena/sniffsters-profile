var LoginCtrl = (function () {
    function LoginCtrl($scope, $firebase, $firebaseSimpleLogin, $state, toastr, DataService) {
        this.$scope = $scope;
        this.$firebase = $firebase;
        this.$firebaseSimpleLogin = $firebaseSimpleLogin;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.login = this;
        console.log($scope.auth);
        this.email = "breeder1@gmail.com";
        this.pass = "123456";
    }

    LoginCtrl.prototype.Signin = function (email, pass) {
        console.log('ddd');
        var fref = new Firebase("https://torid-fire-6526.firebaseio.com/");
        var auth = new FirebaseSimpleLogin(fref, function (error, user) {
            if (error) {
                alert(error);
            } else if (user) {
                $state.go('home');
            } else {
            }
        });

//        email = '<' + email + '>';
//        pass = '<' + pass + '>';

        auth.login('password', {
            email: email,
            password: pass,
            rememberMe: true
        });
    };

    LoginCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    LoginCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return LoginCtrl;
})();
