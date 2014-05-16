/// <reference path="../app.ts" />

interface IAbouteditScope extends IMainScope {
    aboutedit:AbouteditCtrl;
    BreederProfile: IBreederProfile;
}
class AbouteditCtrl {

    constructor(public $scope:IAbouteditScope,public $state:ng.ui.IStateService, public DataService:DataService,public CopyProfileService:CopyProfileService, public toastr) {
        $scope.aboutedit = this;
    }


    BreederProfile:IBreederProfile = this.CopyProfileService.GetProfileClone();

    Save() {
//Run Service UpdateProfile Method and get promise back
        var promise:ng.IPromise<IBreederProfile> = this.DataService.updateProfile<IBreederProfile>(this.BreederProfile);
//resolving promise


        promise.then(
            () => {
                // Success
                this.ShowSuccess('Successfully Saved');
            },
            () => {
                // Error
                this.ShowError('Db Connection Problem');
            });

    }

    ShowSuccess(note:string) {
        this.toastr.info(note);
        this.CopyProfileService.SetProfile(this.BreederProfile);
        this.$scope.index.UpdateBreederProfile(this.BreederProfile);


        this.$state.go('^');
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}