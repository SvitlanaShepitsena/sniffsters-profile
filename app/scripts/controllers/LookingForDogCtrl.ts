/// <reference path="IndexCtrl.ts" />

class LookingForDogCtrl {

    constructor(public $scope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.lookingForDog = this;
        $scope.home.IsSearchHidden = true;
    }

    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}