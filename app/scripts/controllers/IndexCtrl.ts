/// <reference path="../services/CopyProfileService.ts" />
/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="../services/DataService.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angular-ui/angular-ui-router.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/toastr/toastr.d.ts" />


interface IMainScope extends ng.IScope {
    index:IndexCtrl;
}
class IndexCtrl {
    BreederProfile:IBreederProfile;
    BreederProfileCopy:IBreederProfile;
    text:string = 'Text Outer Scope';
    error:boolean;

    constructor($scope:IMainScope, public $state:ng.ui.IStateService, public toastr, public DataService:DataService,public CopyProfileService:CopyProfileService) {
        $scope.index = this;
        var promiseT = this.DataService.getProfile<IBreederProfile>();

        promiseT.then((breederProfile:IBreederProfile) => {
            //Success
            this.error = false;
            this.BreederProfile = breederProfile;


//            Put a received BreederProfile to CopyProfileService, using it like container
//            in order we can inject CopyProfileService in other Ctrls and have access to BreederProfile Data (SHaring data between controllers)
            this.CopyProfileService.SetProfile(breederProfile);

        }, () => {
            //Error
            this.error = true;
            this.ShowError("Error in Db Connection")
        })
    }


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
//                Any time we change information on server we need to update our BreederProfile inside a container.
                this.CopyProfileService.SetProfile(this.BreederProfileCopy);
                this.ShowSuccess('Successfully saved');
            },
            () => {
                // Error
                this.ShowError('Db Connection Problem');
            });

    }


}
