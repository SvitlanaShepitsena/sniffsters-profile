/// <reference path="IndexCtrl.ts" />

interface IForBreedersScope extends IMainScope {
    forBreeders:ForBreedersCtrl;
    ctrl:IndexCtrl;
}
class ForBreedersCtrl {

    constructor(public $scope:IForBreedersScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.forBreeders = this;
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}