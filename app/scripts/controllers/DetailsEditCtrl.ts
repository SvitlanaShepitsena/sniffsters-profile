/// <reference path="IndexCtrl.ts" />

interface IDetailsEditScope extends IMainScope {
    DetailsEdit:DetailsEditCtrl;
    ctrl:IndexCtrl;
}
class DetailsEditCtrl {

    constructor($scope:IDetailsEditScope , public $state:ng.ui.IStateService,public toastr:Toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
        $scope.DetailsEdit = this;
    }


     ShowSuccess(note:string) {

        this.toastr.info(note);
        }

     ShowError(note:string) {
        this.toastr.error(note);
        }

}