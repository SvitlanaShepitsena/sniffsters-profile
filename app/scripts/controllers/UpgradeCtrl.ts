/// <reference path="HomeCtrl.ts" />

class UpgradeCtrl {
    home:HomeCtrl;

    constructor(public $scope, public $state:ng.ui.IStateService, public toastr:Toastr, public $firebase) {
        $scope.upgrade = this;
    }

    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}