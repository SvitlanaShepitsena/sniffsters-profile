/// <reference path="IndexCtrl.ts" />

interface ILoginScope extends IMainScope {
    login:LoginCtrl;
    ctrl:IndexCtrl;
}
class LoginCtrl {

    constructor(public $scope:ILoginScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.login = this;
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}