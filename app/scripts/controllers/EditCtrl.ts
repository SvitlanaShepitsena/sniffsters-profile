/// <reference path="../../bower_components/dt-angular/angular.d.ts" />
/// <reference path="../../bower_components/dt-toastr/toastr.d.ts" />

/// <reference path="IndexCtrl.ts" />
/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="../services/CopyProfileService.ts" />
/// <reference path="../app.ts" />

interface IEditScope extends IMainScope {
    edit:EditCtrl;

}
class EditCtrl {

    constructor($scope:IEditScope, public toastr:Toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
        $scope.edit = this;

        this.BreederProfileEdit = this.CopyProfileService.GetProfile();
//        console.log(CopyProfileService);
    }

    BreederProfileEdit:IBreederProfile = new BreederProfile();

    Save() {
//Run Service UpdateProfile Method and get promise back
        var promise:ng.IPromise<IBreederProfile> = this.DataService.updateProfile<IBreederProfile>(this.BreederProfileEdit);
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
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

}