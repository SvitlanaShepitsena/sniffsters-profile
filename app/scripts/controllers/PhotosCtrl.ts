/// <reference path="IndexCtrl.ts" />

interface IPhotosScope extends IMainScope {
    photos:PhotosCtrl;
    ctrl:IndexCtrl;
}
class PhotosCtrl {

    constructor($scope:IPhotosScope , public $state:ng.ui.IStateService,public toastr:Toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
        $scope.photos = this;
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