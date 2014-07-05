/// <reference path="IndexCtrl.ts" />

interface I#name#Scope extends IMainScope {
    #lname#:#name#Ctrl;
    ctrl:IndexCtrl;
}
class #name#Ctrl {

    constructor(public $scope:I#name#Scope , public $state:ng.ui.IStateService,public toastr:Toastr, public DataService:DataService) {
        $scope.#lname# = this;
    }


     ShowSuccess(note:string) {

        this.toastr.info(note);
        }

     ShowError(note:string) {
        this.toastr.error(note);
        }

}