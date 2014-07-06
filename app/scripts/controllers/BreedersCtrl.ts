/// <reference path="IndexCtrl.ts" />

interface IBreedersScope extends IMainScope {
    breeders:BreedersCtrl;
    ctrl:IndexCtrl;
}
class BreedersCtrl {

    constructor(public $scope:IBreedersScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.breeders = this;
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}