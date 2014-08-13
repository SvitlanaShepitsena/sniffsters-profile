/// <reference path="HomeCtrl.ts" />

interface IAdvertiseScope extends IMainScope {
    advertise:AdvertiseCtrl;
    ctrl:IndexCtrl;
    home:HomeCtrl;
}
class AdvertiseCtrl {

    constructor(public $scope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.advertise = this;
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