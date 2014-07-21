/// <reference path="HomeCtrl.ts" />

class #name#Ctrl {

    constructor(public $scope, public $state:ng.ui.IStateService, public toastr:Toastr, public $firebase) {
        $scope.#lname# = this;
    }

     ShowSuccess(note:string) {
        this.toastr.info(note);
        }

     ShowError(note:string) {
        this.toastr.error(note);
        }
}