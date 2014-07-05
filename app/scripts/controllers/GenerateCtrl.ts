/// <reference path="IndexCtrl.ts" />

interface IGenerateScope extends IMainScope {
    generate:GenerateCtrl;
    ctrl:IndexCtrl;
}
class GenerateCtrl {

    constructor(public $scope:IGenerateScope, $firebase, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.generate = this;

    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}