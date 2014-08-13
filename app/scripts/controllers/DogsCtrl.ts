/// <reference path="IndexCtrl.ts" />

interface IDogsScope extends IMainScope {
    dogs:DogsCtrl;
    ctrl:IndexCtrl;
    home:HomeCtrl;
}
class DogsCtrl {

    constructor(public $scope:IDogsScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.dogs = this;
        $scope.home.IsSearchHidden = false;
        $scope.home.IsHome = false;
    }

    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}