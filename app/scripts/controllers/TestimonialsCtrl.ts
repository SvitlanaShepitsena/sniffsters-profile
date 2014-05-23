/// <reference path="IndexCtrl.ts" />

interface ITestimonialsScope extends IMainScope {
    testimonials:TestimonialsCtrl;
    ctrl:IndexCtrl;
}
class TestimonialsCtrl {

    constructor($scope:ITestimonialsScope , public $state:ng.ui.IStateService,public toastr:Toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
        $scope.testimonials = this;
    }


     ShowSuccess(note:string) {

        this.toastr.info(note);
        }

     ShowError(note:string) {
        this.toastr.error(note);
        }

}