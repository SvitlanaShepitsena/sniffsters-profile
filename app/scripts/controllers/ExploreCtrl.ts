/// <reference path="HomeCtrl.ts" />

class ExploreCtrl {

    constructor(public $scope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.explore = this;
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