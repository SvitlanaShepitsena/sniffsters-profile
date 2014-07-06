/// <reference path="IndexCtrl.ts" />

interface ITermsScope extends IMainScope {
    terms:TermsCtrl;
    ctrl:IndexCtrl;
}
class TermsCtrl {

    constructor(public $scope:ITermsScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.terms = this;
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}