/// <reference path="IndexCtrl.ts" />

interface IBreedersScope extends IMainScope {
    breeders:BreedersCtrl;
    ctrl:IndexCtrl;
    home:HomeCtrl;
}
class BreedersCtrl {

    constructor(public $scope:IBreedersScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.home.IsSearchHidden = false;
        $scope.breeders = this;
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}