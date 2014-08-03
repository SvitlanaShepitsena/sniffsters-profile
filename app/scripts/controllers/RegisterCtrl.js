/// <reference path="HomeCtrl.ts" />
var RegisterCtrl = (function () {
    function RegisterCtrl($scope, $modal, $filter, $state, toastr, DataService) {
        var _this = this;
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.register = this;
        $scope.home.IsSearchHidden = false;

        this.isBreeder = false;

        $scope.email = "user_" + Math.random().toString(36).substring(13) + "@gmail.com";
        $scope.pass = "123456";
        $scope.confpass = "123456";
        $scope.username = {};

        $scope.setUsername = function (username) {
            var breeders = $scope.home.MainRefFire.$child('breeders');

            breeders.$on('value', function (snapshot) {
                var bs = snapshot.snapshot.value;

                var userNames = _.pluck(_.pluck($filter('orderByPriority')(bs), 'profile'), 'UserName');
                console.log(userNames);
            });
        };

        $scope.register = function (email, pass, confpass, isBreeder) {
            if (pass.length < 5) {
                _this.ShowError("Password should be not less than 5 symbols");
                return;
            }

            if (pass !== confpass) {
                _this.ShowError("Passwords do not match");
                return;
            }

            $scope.username.val = email.split('@')[0];

            $scope.modal = $modal({
                scope: $scope,
                title: 'Choose your username',
                template: '../views/modals/choose-username.html',
                show: true
            });
            //            $scope.home.auth.$createUser(email, pass).then(() => {
            //            this.Signin(email, pass)
            //            }, (error)=> {
            //                this.ShowError(error);
            //            })
        };
    }
    RegisterCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    RegisterCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return RegisterCtrl;
})();
