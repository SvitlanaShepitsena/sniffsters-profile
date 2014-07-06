/// <reference path="IndexCtrl.ts" />

interface IContactScope extends IMainScope {
    contact:ContactCtrl;
    ctrl:IndexCtrl;
}
class ContactCtrl {

    constructor(public $scope:IContactScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.contact = this;
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}