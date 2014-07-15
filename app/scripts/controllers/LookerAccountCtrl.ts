/// <reference path="HomeCtrl.ts" />

interface ILookerAccountScope extends IHomeScope {
    lookerAccount:LookerAccountCtrl;
    home:HomeCtrl;
}
class LookerAccountCtrl {

    constructor(public $scope:ILookerAccountScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.lookerAccount = this;
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}