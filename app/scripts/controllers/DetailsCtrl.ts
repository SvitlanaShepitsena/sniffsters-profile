/// <reference path="IndexCtrl.ts" />

interface IDetailsScope extends IMainScope {
    details:DetailsCtrl;
    ctrl:IndexCtrl;
}
class DetailsCtrl {

    constructor($scope:IDetailsScope , public $state:ng.ui.IStateService,public toastr:Toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
        $scope.details = this;
        this.BreederProfile = CopyProfileService.GetProfileClone();
    }

    BreederProfile:IBreederProfile;

     ShowSuccess(note:string) {

        this.toastr.info(note);
        }

     ShowError(note:string) {
        this.toastr.error(note);
        }

}