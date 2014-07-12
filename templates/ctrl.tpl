/// <reference path="HomeCtrl.ts" />

interface I#name#Scope extends IHomeScope {
    #lname#:#name#Ctrl;
    home:HomeCtrl;
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