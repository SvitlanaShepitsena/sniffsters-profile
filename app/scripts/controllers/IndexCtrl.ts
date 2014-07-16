/// <reference path="../services/CopyProfileService.ts" />
/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="../services/DataService.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angular-ui/angular-ui-router.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/toastr/toastr.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase-simplelogin.d.ts" />
interface IMainScope extends ng.IScope {
    index:IndexCtrl;
}
class IndexCtrl {
    BreederProfile:IBreederProfile;
    BreederProfileEdit:IBreederProfile;

    BreederProfileCopy:IBreederProfile;
    error:boolean;
    Id:string;
    IdFire:string;
    state:string;
    spinner:boolean;
    BreederName:string;
    url:string;
    isOwner:boolean;


    constructor(public $scope, $stateParams, public $rootScope, public $window, public toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
        $scope.index = this;

        $scope.home.IsSearchHidden = false;
        $scope.home.url = 'about';
        $scope.home.hideMenu = false;
        $scope.slide = '';

        $scope.cover = {};
        this.spinner = true;


        var fref = new Firebase("https://torid-fire-6526.firebaseio.com/");
        new FirebaseSimpleLogin(fref, () => {
            var requestEmail = $stateParams.uname;

            if (requestEmail == "public") {
                requestEmail = $scope.home.Uname;
            }
            var promiseT = this.DataService.getProfile(requestEmail);
            promiseT.then((breederProfile:IBreederProfile) => {
                //Success
                $scope.home.Ownership();
                this.error = false;
                this.BreederProfile = breederProfile;

                this.CopyProfileService.SetProfile(breederProfile);
                this.BreederProfileEdit = CopyProfileService.GetProfileClone();

            }, () => {
                //Error
                this.error = true;
                this.ShowError("Error in Db Connection")
            }).finally(() => {
                this.spinner = false;
            })
        });
    }


    SaveKennelName() {
        var breederProfileOriginal:IBreederProfile = this.CopyProfileService.GetProfileClone();

        breederProfileOriginal.KennelName = this.BreederProfileEdit.KennelName;
        breederProfileOriginal.Story = this.BreederProfileEdit.Story;
        this.Save(breederProfileOriginal);
    }


    /* =DETAILS*/

    SavePersonalInfo() {
        var breederProfileOriginal:IBreederProfile = this.CopyProfileService.GetProfileClone();

        breederProfileOriginal.KennelName = this.BreederProfileEdit.KennelName;
        breederProfileOriginal.Website = this.BreederProfileEdit.Website;
        breederProfileOriginal.Email = this.BreederProfileEdit.Email;
        breederProfileOriginal.Phone = this.BreederProfileEdit.Phone;
        this.Save(breederProfileOriginal);
    }

    SaveLocation() {
        var breederProfileOriginal:IBreederProfile = this.CopyProfileService.GetProfileClone();

        breederProfileOriginal.City = this.BreederProfileEdit.City;
        breederProfileOriginal.Zip = this.BreederProfileEdit.Zip;
        breederProfileOriginal.State = this.BreederProfileEdit.State;
        this.Save(breederProfileOriginal);
    }

    SaveSpecifics() {
        var breederProfileOriginal:IBreederProfile = this.CopyProfileService.GetProfileClone();

        breederProfileOriginal.Certifications = this.BreederProfileEdit.Certifications;
        breederProfileOriginal.Insurances = this.BreederProfileEdit.Insurances;
        this.Save(breederProfileOriginal);
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

    GetClone() {
        return this.CopyProfileService.GetProfileClone();
    }

    UpdateBreederProfile(breederProfile:IBreederProfile) {
        this.BreederProfile = breederProfile;
    }

    Save(breederProfile:IBreederProfile) {
//Run Service UpdateProfile Method and get promise back
        this.DataService.updateProfile(breederProfile).then(
            () => {
                // Success
                this.CopyProfileService.SetProfile(breederProfile);
//                Update scope on IndexCtrl.
                this.UpdateBreederProfile(breederProfile);

                this.ShowSuccess('Successfully Saved');
            },
            () => {
                // Error
                this.ShowError('Db Connection Problem');
            });
    }
}
