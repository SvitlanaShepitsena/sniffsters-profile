/// <reference path="HomeCtrl.ts" />

interface IForBreedersScope extends IMainScope {
    forBreeders:ForBreedersCtrl;
    home:HomeCtrl;
}
class ForBreedersCtrl {

    constructor(public $scope:IForBreedersScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.forBreeders = this;
        $scope.home.hideMenu = false;
    }

    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}