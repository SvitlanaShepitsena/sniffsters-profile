/// <reference path="IndexCtrl.ts" />

interface IExploreScope extends IMainScope {
    explore:ExploreCtrl;
    ctrl:IndexCtrl;
}
class ExploreCtrl {

    constructor(public $scope:IExploreScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.explore = this;
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}