/// <reference path="IndexCtrl.ts" />

interface ITrashScope extends IMainScope {
    trash:TrashCtrl;
    ctrl:IndexCtrl;
}
class TrashCtrl {

    constructor(public $scope:ITrashScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.trash = this;
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}