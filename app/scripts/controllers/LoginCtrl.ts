/// <reference path="HomeCtrl.ts" />

interface ILoginScope extends IHomeScope {
    login:LoginCtrl;
    home:HomeCtrl;
    auth:FirebaseSimpleLogin;
}
class LoginCtrl {

    constructor(public $scope:ILoginScope, public $firebase, public $firebaseSimpleLogin, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.login = this;
        this.email = "breeder1@gmail.com";
        this.pass = "123456";
        $scope.home.IsSearchHidden = false;
    }

    email:string;
    pass:string;


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}