/// <reference path="HomeCtrl.ts" />

interface ILookerProfileScope extends IHomeScope {
    lookerProfile:LookerProfileCtrl;
    home:HomeCtrl;
}
class LookerProfileCtrl {

    constructor(public $scope:ILookerProfileScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.lookerProfile = this;
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}