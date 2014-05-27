/// <reference path="IndexCtrl.ts" />

interface IDetailsEditScope extends IMainScope {
    DetailsEdit:DetailsEditCtrl;
    ctrl:IndexCtrl;
}
class DetailsEditCtrl {

    constructor(public $scope:IDetailsEditScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
        $scope.DetailsEdit = this;
        this.BreederProfileEdit = this.CopyProfileService.GetProfileClone();
    }

    BreederProfileEdit:IBreederProfile = new BreederProfile();


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

    GetClone() {
        return this.CopyProfileService.GetProfileClone();
    }

    Save(breederProfile:IBreederProfile) {
//Run Service UpdateProfile Method and get promise back
        var promise:ng.IPromise<IBreederProfile> = this.DataService.updateProfile<IBreederProfile>(breederProfile);
//resolving promise

        promise.then(
            () => {
                // Success
                this.CopyProfileService.SetProfile(breederProfile);

//                Update scope on IndexCtrl.
                this.$scope.ctrl.UpdateBreederProfile(breederProfile);

                this.ShowSuccess('Successfully Saved');
            },
            () => {
                // Error
                this.ShowError('Db Connection Problem');
            });
    }
}