/// <reference path="HomeCtrl.ts" />

interface IContactScope extends IMainScope {
    contact:ContactCtrl;
    ctrl:IndexCtrl;
    home:HomeCtrl;
}
class ContactCtrl {

    constructor(public $scope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.contact = this;
        $scope.home.IsSearchHidden = false;
        $scope.home.IsHome = false;
    }

    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}