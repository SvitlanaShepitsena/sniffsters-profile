/// <reference path="IndexCtrl.ts" />

interface IPuppiesScope extends IMainScope {
    puppies:PuppiesCtrl;
    ctrl:IndexCtrl;
}
class PuppiesCtrl {

    constructor(public $scope:IPuppiesScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
        $scope.puppies = this;
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}