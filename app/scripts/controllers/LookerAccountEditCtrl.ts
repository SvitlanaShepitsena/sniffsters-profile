/// <reference path="HomeCtrl.ts" />

interface ILookerAccountEditScope extends IHomeScope {
    lookerAccountEdit:LookerAccountEditCtrl;
    home:HomeCtrl;
}
class LookerAccountEditCtrl {

    constructor(public $scope:ILookerAccountEditScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.lookerAccountEdit = this;
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}