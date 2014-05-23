/// <reference path="IndexCtrl.ts" />

interface ITestimonialsEditScope extends IMainScope {
    testimonialsEdit:TestimonialsEditCtrl;
    ctrl:IndexCtrl;
    BreederProfileEdit:IBreederProfile;
}
class TestimonialsEditCtrl {

    constructor($scope:ITestimonialsEditScope , public $state:ng.ui.IStateService,public toastr:Toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
        $scope.testimonialsEdit = this;

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