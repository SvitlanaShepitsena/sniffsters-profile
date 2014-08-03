/// <reference path="HomeCtrl.ts" />

class BreedsCtrl {

    constructor(public $scope, public $state:ng.ui.IStateService, public toastr:Toastr, public $firebase) {
        $scope.breeds = this;
    }

    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}