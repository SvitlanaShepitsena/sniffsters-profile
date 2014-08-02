/// <reference path="HomeCtrl.ts" />

class RegisterCtrl {
    email:string;
    pass:string;
    confpass:string;
    isBreeder:boolean;

    constructor(public $scope, $modal, $filter, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.register = this;
        $scope.home.IsSearchHidden = false;

        this.isBreeder = false;

        $scope.email = "user_" + Math.random().toString(36).substring(13) + "@gmail.com";
        $scope.pass = "123456";
        $scope.confpass = "123456";
        $scope.username = {};

        $scope.setUsername = (username) => {
            var breeders = $scope.home.MainRefFire.$child('breeders');

            breeders.$on('value', (snapshot:any)=> {
                var bs = snapshot.snapshot.value;

                var userNames = _.pluck(_.pluck($filter('orderByPriority')(bs), 'profile'), 'UserName');
                console.log(userNames);
            });

        }

        $scope.register = (email:string, pass:string, confpass:string, isBreeder:boolean) => {

            if (pass.length < 5) {
                this.ShowError("Password should be not less than 5 symbols");
                return;
            }

            if (pass !== confpass) {
                this.ShowError("Passwords do not match");
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
//
//            this.Signin(email, pass)
//            }, (error)=> {
//                this.ShowError(error);
//            })
        }

    }

    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}