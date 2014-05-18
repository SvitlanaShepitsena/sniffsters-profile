/// <reference path="../app.ts" />
/// <reference path="../services/CopyProfileService.ts" />
/// <reference path="../models/IBreederProfile.ts" />


interface IMainScope extends ng.IScope {
    index:IndexCtrl;
}
class IndexCtrl {

    constructor($scope:IMainScope, public $state:ng.ui.IStateService, public toastr, public DataService:DataService,public CopyProfileService:CopyProfileService) {
        $scope.index = this;

        var promiseT = this.DataService.getProfile<IBreederProfile>();

        promiseT.then((breederProfile:IBreederProfile) => {
            //Success
            this.error = false;
            this.CopyProfileService.SetProfile(breederProfile);
            this.BreederProfile = this.CopyProfileService.BreederProfile;
        }, () => {
            //Error
            this.error = true;
            this.ShowError("Error in Db Connection")
        })
    }

    BreederProfile:IBreederProfile;

    BreederProfileCopy:IBreederProfile;

    text:string = 'Text Outer Scope';

    error:boolean;

    ShowError(errorMessage:string) {
        this.toastr.error(errorMessage);
    }

    ShowSuccess(successMessage:string) {
        this.toastr.success(successMessage);
    }

    Clone() {
        this.BreederProfileCopy = this.CopyProfileService.GetProfileClone();
    }

    UpdateBreederProfile(breederProfile:IBreederProfile){
        this.BreederProfile = breederProfile;
    }


    Save() {
        var promise:ng.IPromise<IBreederProfile> = this.DataService.updateProfile<IBreederProfile>(this.BreederProfileCopy);
//resolving promise


        promise.then(
            () => {
                // Success
                this.BreederProfile = this.BreederProfileCopy;
                this.ShowSuccess('Successfully saved');
            },
            () => {
                // Error
                this.ShowError('Db Connection Problem');
            });

    }


}
