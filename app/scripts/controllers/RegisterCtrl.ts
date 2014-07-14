/// <reference path="HomeCtrl.ts" />

interface IRegisterScope extends IMainScope {
    register:RegisterCtrl;
    ctrl:IndexCtrl;
    home:HomeCtrl;
}
class RegisterCtrl {
    email:string;
    pass:string;
    confpass:string;


    constructor(public $scope:IRegisterScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.register = this;
        $scope.home.IsSearchHidden = false;


        this.email = "";
        this.pass = "123456";
        this.confpass = "123456";
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}