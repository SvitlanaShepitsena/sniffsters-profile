/// <reference path="IndexCtrl.ts" />

interface IPuppiesLitterScope extends IMainScope {
    puppiesLitter:PuppiesLitterCtrl;
    ctrl:IndexCtrl;
}
class PuppiesLitterCtrl {

    constructor(public $scope:IPuppiesLitterScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
        $scope.puppiesLitter = this;
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}