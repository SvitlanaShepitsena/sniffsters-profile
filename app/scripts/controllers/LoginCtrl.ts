/// <reference path="HomeCtrl.ts" />

interface ILoginScope extends IHomeScope {
    login:LoginCtrl;
    home:HomeCtrl;
    auth:FirebaseSimpleLogin;
}
class LoginCtrl {

    constructor(public $scope:ILoginScope, public $firebase, public $firebaseSimpleLogin, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.login = this;
        $scope.home.IsSearchHidden = false;
        this.email = "";
        this.pass = "123456";
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