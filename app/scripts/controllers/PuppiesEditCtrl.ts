/// <reference path="IndexCtrl.ts" />

interface IPuppiesEditScope extends IMainScope {
    puppiesEdit:PuppiesEditCtrl;
    ctrl:IndexCtrl;
}
class PuppiesEditCtrl {

    constructor($scope:IPuppiesEditScope , public $state:ng.ui.IStateService,public toastr:Toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
        $scope.puppiesEdit = this;
        this.BreederProfileEdit = CopyProfileService.GetProfileClone();
    }

    BreederProfileEdit:IBreederProfile;

     ShowSuccess(note:string) {

        this.toastr.info(note);
        }

     ShowError(note:string) {
        this.toastr.error(note);
        }

}