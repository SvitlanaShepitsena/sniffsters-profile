/// <reference path="IndexCtrl.ts" />
/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angular-ui/angular-ui-router.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/toastr/toastr.d.ts" />
/// <reference path="../services/CopyProfileService.ts" />
/// <reference path="../app.ts" />

interface IEditScope extends IMainScope {
    edit:EditCtrl;
    ctrl:IndexCtrl;

}
class EditCtrl {

    constructor(public $scope:IEditScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
        $scope.edit = this;

        this.BreederProfileEdit = this.CopyProfileService.GetProfileClone();

    }

    BreederProfileEdit:IBreederProfile = new BreederProfile();

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

    ShowSuccess(note:string) {
        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

    GetClone() {
        return this.CopyProfileService.GetProfileClone();
    }


}