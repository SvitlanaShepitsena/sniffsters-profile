/// <reference path="IndexCtrl.ts" />

interface ILoginScope extends IMainScope {
    login:LoginCtrl;
    ctrl:IndexCtrl;
    auth:FirebaseSimpleLogin;
}
class LoginCtrl {

    constructor(public $scope:ILoginScope, public $firebase, public $firebaseSimpleLogin, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.login = this;
        console.log($scope.auth);
        this.email = "breeder1@gmail.com";
        this.pass = "123456";
    }

    email:string;
    pass:string;

    Signin(email:string, pass:string) {
        console.log('ddd');
        var fref = new Firebase("https://torid-fire-6526.firebaseio.com/");
        var auth = new FirebaseSimpleLogin(fref, (error, user) => {
            if (error) {
                // an error occurred while attempting login
                this.ShowError(error.toString());
            } else if (user) {
                // user authenticated with Firebase
                this.ShowSuccess('Welcome to Sniffsters.com')
            } else {
                // user is logged out
            }
        });


        auth.login('password', {
            email: email,
            password: pass,
            rememberMe: true
        });
    }

    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}