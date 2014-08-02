/// <reference path="HomeCtrl.ts" />

class ManageBreederAccountCtrl {

    constructor(public $scope, public $state:ng.ui.IStateService, public toastr:Toastr, public $firebase) {
        $scope.manageBreederAccount = this;
    }

    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}