/// <reference path="HomeCtrl.ts" />
/// <reference path="../services/FinduserService.ts" />
var RegisterCtrl = (function () {
    function RegisterCtrl($scope, $modal, settings, $firebase, $filter, $state, toastr, FinduserService) {
        var _this = this;
        this.$scope = $scope;
        this.$firebase = $firebase;
        this.$state = $state;
        this.toastr = toastr;
        this.FinduserService = FinduserService;
        $scope.register = this;
        $scope.home.IsSearchHidden = false;

        this.isBreeder = false;

        //        $scope.email = "user_" + Math.random().toString(36).substring(13) + "@gmail.com";
        //        $scope.pass = "123456";
        //        $scope.confpass = "123456";
        $scope.username = {};
        $scope.userExists = false;

        $scope.setUsername = function (username) {
            FinduserService.find(username).then(function () {
                $scope.userExists = true;
                _this.ShowError(settings.userExists);
            }, function () {
                $scope.home.auth.$createUser($scope.email, $scope.pass).then(function () {
                    if ($scope.isNewBreeder) {
                        var breederGenerator = new BreederGenerator();
                        breederGenerator.create($scope.home.FireProcess($scope.email), $scope.home.MainUrl, _this.$firebase, username);
                    } else {
                        var lookerGenerator = new LookerGenerator();
                        lookerGenerator.create($scope.home.FireProcess($scope.email), $scope.home.MainUrl, _this.$firebase, username);
                    }

                    $scope.home.Signin($scope.email, $scope.pass);
                }, function (error) {
                    _this.ShowError(error);
                });

                $scope.modal.hide();
            });
        };

        $scope.register = function (email, pass, confpass, isBreeder) {
            $scope.email = email;
            $scope.password = pass;
            $scope.isNewBreeder = isBreeder;

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
