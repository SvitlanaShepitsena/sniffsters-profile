/// <reference path="IndexCtrl.ts" />

interface ILookingForDogScope extends IMainScope {
    lookingForDog:LookingForDogCtrl;
    ctrl:IndexCtrl;
}
class LookingForDogCtrl {

    constructor(public $scope:ILookingForDogScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.lookingForDog = this;
    }


    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}