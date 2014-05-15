/// <reference path="../app.ts" />
/// <reference path="../services/CopyProfileService.ts" />
/// <reference path="../models/IBreederProfile.ts" />


interface IMainScope extends ng.IScope {
    index:IndexCtrl;
    UserProfile: IBreederProfile;
}
class IndexCtrl {

    constructor($scope:IMainScope, public toastr, public DataService:DataService,public CopyProfileService:CopyProfileService) {
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

    text:string = 'Text Outer Scope';

    error:boolean;

    ShowError(errorMessage:string) {
        this.toastr.error(errorMessage);
    }

    UpdateBreederProfile(breederProfile:IBreederProfile){
        this.BreederProfile = breederProfile;
    }
}
