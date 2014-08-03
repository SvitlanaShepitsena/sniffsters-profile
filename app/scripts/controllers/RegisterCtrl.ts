/// <reference path="HomeCtrl.ts" />
/// <reference path="../services/FinduserService.ts" />

class RegisterCtrl {
    email:string;
    pass:string;
    confpass:string;
    isBreeder:boolean;

    constructor(public $scope, $modal, settings, public $firebase, $filter, public $state:ng.ui.IStateService, public toastr:Toastr, public FinduserService:FinduserService) {
        $scope.register = this;
        $scope.home.IsSearchHidden = false;

        this.isBreeder = false;

        $scope.email = "user_" + Math.random().toString(36).substring(13) + "@gmail.com";
        $scope.pass = "123456";
        $scope.confpass = "123456";
        $scope.username = {};
        $scope.userExists = false;

        $scope.setUsername = (username) => {

            FinduserService.find(username).then(()=> {
                $scope.userExists = true;
                this.ShowError(settings.userExists);
            }, () => {

                $scope.home.auth.$createUser($scope.email, $scope.pass).then(() => {


                    if ($scope.isNewBreeder) {
                        var breederGenerator = new BreederGenerator();
                        breederGenerator.create($scope.home.FireProcess($scope.email), $scope.home.MainUrl, this.$firebase, username);
                    } else {
                        var lookerGenerator = new LookerGenerator();
                        lookerGenerator.create($scope.home.FireProcess($scope.email), $scope.home.MainUrl, this.$firebase, username);
                    }


                    $scope.home.Signin($scope.email, $scope.pass)
                }, (error)=> {
                    this.ShowError(error);
                })


                $scope.modal.hide();
            });
        }

        $scope.register = (email:string, pass:string, confpass:string, isBreeder:boolean) => {
            $scope.email = email;
            $scope.password = pass;
            $scope.isNewBreeder = isBreeder;

            if (pass.length < 5) {
                this.ShowError("Password should be not less than 5 symbols");
                return;
            }

            if (pass !== confpass) {
                this.ShowError("Passwords do not match");
                return;
            }

            $scope.username.val = email.split('@')[0];

            $scope.modal = $modal(
                {
                    scope: $scope,
                    title: 'Choose your username',
                    template: '../views/modals/choose-username.html',
                    show: true
                }
            );

        }
    }

    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}