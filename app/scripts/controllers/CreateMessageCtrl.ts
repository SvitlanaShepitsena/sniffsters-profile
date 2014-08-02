/// <reference path="IndexCtrl.ts" />

interface ICreateMessageScope extends IMainScope {
    createMessage:CreateMessageCtrl;
    ctrl:IndexCtrl;
}
class CreateMessageCtrl {

    constructor(public $scope:ICreateMessageScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.createMessage = this;
    }

    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }
}