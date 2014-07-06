/// <reference path="IndexCtrl.ts" />

interface IDogsScope extends IMainScope {
    dogs:DogsCtrl;
    ctrl:IndexCtrl;
}
class DogsCtrl {

    constructor(public $scope:IDogsScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.dogs = this;
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}