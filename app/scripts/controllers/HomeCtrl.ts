/// <reference path="IndexCtrl.ts" />

interface IHomeScope extends IMainScope {
    home:HomeCtrl;
    ctrl:IndexCtrl;
}
class HomeCtrl {

    constructor(public $scope:IHomeScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.home = this;
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}