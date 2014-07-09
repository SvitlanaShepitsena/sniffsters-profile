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
    BreederProfileEdit:IBreederProfile;

    BreederProfileCopy:IBreederProfile;
    error:boolean;
    Id:string;
    IdFire:string;
    url:string;
    spinner:boolean;
    menuIndex:number;
    BreederName:string;

    animationDirection(menuIndex:number):string {

        if (menuIndex > this.menuIndex)
            return 'slide-left';
        else
            return 'slide-right';
    }


    constructor(public $scope, $location, public $rootScope, public $window, public $state:ng.ui.IStateService, public toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
        $scope.home.IsSearchHidden = false;
        this.url = 'about';

        $scope.navigate = (menuIndex:number) => {
            $scope.slide = this.animationDirection(menuIndex);

            if (menuIndex == 1) {
                this.menuIndex = 1;
                $location.url('/profile/about');
            }


            if (menuIndex == 2) {
                this.menuIndex = 2;
                $location.url('/profile/photos');
            }


            if (menuIndex == 3) {
                this.url = 'puppies';
                this.menuIndex = 3;
                $location.url('/profile/puppies');
            }


            if (menuIndex == 4) {
                this.url = 'details';
                this.menuIndex = 4;
                $location.url('/profile/details');
            }


            if (menuIndex == 5) {
                this.url = 'testimonials';
                this.menuIndex = 5;
                $location.url('/profile/testimonials');
            }

        }

        this.menuIndex = 1;
        $scope.slide = '';

        $rootScope.back = () => {
            $scope.slide = 'slide-left';
            $window.history.back();
        }

        $rootScope.forward = () => {
            $scope.slide = 'slide-right';
            $window.history.forward();
        }

        $scope.index = this;
        this.spinner = true;
        this.BreederName = this.GetBreederName();
        this.Id = this.GetBreederName();
        this.IdFire = this.Id.replace(/\./g, '(p)');

        var promiseT = this.DataService.getProfile(this.BreederName);
        promiseT.then((breederProfile:IBreederProfile) => {
            //Success
            this.error = false;
            this.BreederProfile = breederProfile;

//            this.Id = breederProfile.Email;
//            Put a received BreederProfile to CopyProfileService, using it like container
//            in order we can inject CopyProfileService in other Ctrls and have access to BreederProfile Data (SHaring data between controllers)


            this.CopyProfileService.SetProfile(breederProfile);
            this.BreederProfileEdit = CopyProfileService.GetProfileClone();
//            console.log(this.BreederProfileEdit);

        }, () => {
            //Error
            this.error = true;
            this.ShowError("Error in Db Connection")
        }).finally(() => {
            this.spinner = false;
        })
    }

    GetBreederName() {

        var loggedUser = angular.element('#loggedUser');
        if (loggedUser == null) {
            return '';
        }
        var loggedUserTxt:string = loggedUser.text();

        var start = loggedUserTxt.indexOf(',') + 1;
        var finish = loggedUserTxt.indexOf('!');


        var userName = loggedUserTxt.substr(start, finish - start).trim();

        return userName;


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

    Next(state:string) {
        this.$state.go(state);
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
