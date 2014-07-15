/// <reference path="HomeCtrl.ts" />

interface ILookerScope extends IHomeScope {
    looker:LookerCtrl;
    home:HomeCtrl;
}
class LookerCtrl {

    constructor(public $scope:ILookerScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.looker = this;
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}