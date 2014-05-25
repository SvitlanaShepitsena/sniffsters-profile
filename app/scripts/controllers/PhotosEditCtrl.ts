/// <reference path="IndexCtrl.ts" />

interface IPhotosEditScope extends IMainScope {
    photosEdit:PhotosEditCtrl;
    ctrl:IndexCtrl;
}
class PhotosEditCtrl {

    constructor($scope:IPhotosEditScope , public $state:ng.ui.IStateService,public toastr:Toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
        $scope.photosEdit = this;
    }


     ShowSuccess(note:string) {

        this.toastr.info(note);
        }

     ShowError(note:string) {
        this.toastr.error(note);
        }

}