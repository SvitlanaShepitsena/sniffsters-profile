/// <reference path="IndexCtrl.ts" />

interface IAboutScope extends IMainScope {
    about:AboutCtrl;
    ctrl:IndexCtrl;
}
class AboutCtrl {

    constructor(public $scope:IAboutScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.about = this;
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}