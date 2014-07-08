/// <reference path="IndexCtrl.ts" />

interface IRegisterScope extends IMainScope {
    register:RegisterCtrl;
    ctrl:IndexCtrl;
    home:HomeCtrl;
}
class RegisterCtrl {

    constructor(public $scope:IRegisterScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.register = this;
        $scope.home.IsSearchHidden = false;
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}