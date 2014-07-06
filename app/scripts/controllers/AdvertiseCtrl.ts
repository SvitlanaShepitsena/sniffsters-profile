/// <reference path="IndexCtrl.ts" />

interface IAdvertiseScope extends IMainScope {
    advertise:AdvertiseCtrl;
    ctrl:IndexCtrl;
}
class AdvertiseCtrl {

    constructor(public $scope:IAdvertiseScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.advertise = this;
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}